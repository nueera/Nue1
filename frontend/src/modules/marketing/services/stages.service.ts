// @ts-nocheck
// ============================================================================
// Stages Service — CRUD + list, reorder, getDistribution
// ============================================================================

import { marketingApi } from '../api/client';
import { LEADS_ENDPOINTS } from '../api/endpoints';
import type { LeadStageDefinition, StageTransition, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';

export interface CreateStageInput {
  name: string;
  order: number;
  color: string;
  probability: number;
  isDefault?: boolean;
}

export interface UpdateStageInput extends Partial<CreateStageInput> {}

export const stagesService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<LeadStageDefinition>> => {
    return marketingApi.getPaginated<LeadStageDefinition>(LEADS_ENDPOINTS.stageList, params);
  },

  getById: async (id: string): Promise<ApiResponse<LeadStageDefinition>> => {
    return marketingApi.get<LeadStageDefinition>(`${LEADS_ENDPOINTS.stageList}/${id}`);
  },

  create: async (data: CreateStageInput): Promise<ApiResponse<LeadStageDefinition>> => {
    return marketingApi.post<LeadStageDefinition>(LEADS_ENDPOINTS.stageList, data);
  },

  update: async (id: string, data: UpdateStageInput): Promise<ApiResponse<LeadStageDefinition>> => {
    return marketingApi.patch<LeadStageDefinition>(`${LEADS_ENDPOINTS.stageList}/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(`${LEADS_ENDPOINTS.stageList}/${id}`);
  },

  reorder: async (stageIds: string[]): Promise<ApiResponse<LeadStageDefinition[]>> => {
    return marketingApi.post<LeadStageDefinition[]>(`${LEADS_ENDPOINTS.stageList}/reorder`, { stageIds });
  },

  getDistribution: async (): Promise<ApiResponse<Array<{ stageId: string; stageName: string; count: number }>>> => {
    return marketingApi.get<Array<{ stageId: string; stageName: string; count: number }>>(`${LEADS_ENDPOINTS.stageList}/distribution`);
  },
};
