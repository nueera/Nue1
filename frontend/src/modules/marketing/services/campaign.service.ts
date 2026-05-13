// ============================================================================
// Campaign Service — CRUD + list, send, schedule, duplicate, getAnalytics, getAbTestResults
// ============================================================================

import { marketingApi } from '../api/client';
import { CAMPAIGNS_ENDPOINTS } from '../api/endpoints';
import type { Campaign, CampaignMetrics, ABTest, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { CreateCampaignInput, ScheduleCampaignInput } from '../schemas/campaign.schema';

export const campaignService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<Campaign>> => {
    return marketingApi.getPaginated<Campaign>(CAMPAIGNS_ENDPOINTS.list, params);
  },

  getById: async (id: string): Promise<ApiResponse<Campaign>> => {
    return marketingApi.get<Campaign>(CAMPAIGNS_ENDPOINTS.detail(id));
  },

  create: async (data: CreateCampaignInput): Promise<ApiResponse<Campaign>> => {
    return marketingApi.post<Campaign>(CAMPAIGNS_ENDPOINTS.create, data);
  },

  update: async (id: string, data: Partial<CreateCampaignInput>): Promise<ApiResponse<Campaign>> => {
    return marketingApi.patch<Campaign>(CAMPAIGNS_ENDPOINTS.update(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(CAMPAIGNS_ENDPOINTS.delete(id));
  },

  send: async (id: string): Promise<ApiResponse<Campaign>> => {
    return marketingApi.post<Campaign>(CAMPAIGNS_ENDPOINTS.send(id));
  },

  schedule: async (id: string, data: ScheduleCampaignInput): Promise<ApiResponse<Campaign>> => {
    return marketingApi.post<Campaign>(CAMPAIGNS_ENDPOINTS.schedule(id), data);
  },

  duplicate: async (id: string): Promise<ApiResponse<Campaign>> => {
    return marketingApi.post<Campaign>(CAMPAIGNS_ENDPOINTS.duplicate(id));
  },

  getAnalytics: async (id: string): Promise<ApiResponse<CampaignMetrics>> => {
    return marketingApi.get<CampaignMetrics>(CAMPAIGNS_ENDPOINTS.stats(id));
  },

  getAbTestResults: async (id: string): Promise<ApiResponse<ABTest>> => {
    return marketingApi.get<ABTest>(`${CAMPAIGNS_ENDPOINTS.detail(id)}/ab-results`);
  },
};
