// @ts-nocheck
// ============================================================================
// CRM Sync Service — getConfig, updateConfig, getFieldMappings, syncNow, getLogs
// ============================================================================

import { marketingApi } from '../api/client';
import { AUTOMATION_ENDPOINTS } from '../api/endpoints';
import type { CrmSyncConfig, FieldMapping, SyncLog, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';

export interface UpdateCrmSyncConfigInput {
  enabled?: boolean;
  syncFrequency?: CrmSyncConfig['syncFrequency'];
  fieldMappings?: FieldMapping[];
}

export const crmSyncService = {
  getConfig: async (): Promise<ApiResponse<CrmSyncConfig>> => {
    return marketingApi.get<CrmSyncConfig>(AUTOMATION_ENDPOINTS.crmSyncConfig);
  },

  updateConfig: async (data: UpdateCrmSyncConfigInput): Promise<ApiResponse<CrmSyncConfig>> => {
    return marketingApi.patch<CrmSyncConfig>(AUTOMATION_ENDPOINTS.crmSyncConfig, data);
  },

  getFieldMappings: async (): Promise<ApiResponse<FieldMapping[]>> => {
    return marketingApi.get<FieldMapping[]>(`${AUTOMATION_ENDPOINTS.crmSyncConfig}/field-mappings`);
  },

  syncNow: async (): Promise<ApiResponse<{ recordsSynced: number; errors: number }>> => {
    return marketingApi.post<{ recordsSynced: number; errors: number }>(AUTOMATION_ENDPOINTS.crmSyncTrigger);
  },

  getLogs: async (params?: PaginatedRequest): Promise<PaginatedResponse<SyncLog>> => {
    return marketingApi.getPaginated<SyncLog>(AUTOMATION_ENDPOINTS.crmSyncLogs, params);
  },
};
