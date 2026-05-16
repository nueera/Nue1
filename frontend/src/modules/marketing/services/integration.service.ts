// ============================================================================
// Integration Service — list, connect, disconnect, getConfig, updateConfig
// ============================================================================

import { marketingApi } from '../api/client';
import { INTEGRATION_ENDPOINTS } from '../api/endpoints';
import type { Integration, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';

export interface ConnectIntegrationInput {
  config: Record<string, unknown>;
}

export interface UpdateIntegrationConfigInput {
  config: Record<string, unknown>;
}

export const integrationService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<Integration>> => {
    return marketingApi.getPaginated<Integration>(INTEGRATION_ENDPOINTS.list, params);
  },

  getById: async (id: string): Promise<ApiResponse<Integration>> => {
    return marketingApi.get<Integration>(INTEGRATION_ENDPOINTS.detail(id));
  },

  connect: async (id: string, data: ConnectIntegrationInput): Promise<ApiResponse<Integration>> => {
    return marketingApi.post<Integration>(INTEGRATION_ENDPOINTS.connect(id), data);
  },

  disconnect: async (id: string): Promise<ApiResponse<Integration>> => {
    return marketingApi.post<Integration>(INTEGRATION_ENDPOINTS.disconnect(id));
  },

  getConfig: async (id: string): Promise<ApiResponse<Integration['config']>> => {
    return marketingApi.get<Integration['config']>(`${INTEGRATION_ENDPOINTS.detail(id)}/config`);
  },

  updateConfig: async (id: string, data: UpdateIntegrationConfigInput): Promise<ApiResponse<Integration>> => {
    return marketingApi.patch<Integration>(`${INTEGRATION_ENDPOINTS.detail(id)}/config`, data);
  },
};
