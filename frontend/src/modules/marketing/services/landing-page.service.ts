// ============================================================================
// Landing Page Service — CRUD + list, publish, getAnalytics, duplicate
// ============================================================================

import { marketingApi } from '../api/client';
import { AUDIENCES_ENDPOINTS } from '../api/endpoints';
import type { LandingPage, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { CreatePageInput } from '../schemas/landing-page.schema';

export const landingPageService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<LandingPage>> => {
    return marketingApi.getPaginated<LandingPage>(AUDIENCES_ENDPOINTS.landingPageList, params);
  },

  getById: async (id: string): Promise<ApiResponse<LandingPage>> => {
    return marketingApi.get<LandingPage>(AUDIENCES_ENDPOINTS.landingPageDetail(id));
  },

  create: async (data: CreatePageInput): Promise<ApiResponse<LandingPage>> => {
    return marketingApi.post<LandingPage>(AUDIENCES_ENDPOINTS.landingPageList, data);
  },

  update: async (id: string, data: Partial<CreatePageInput>): Promise<ApiResponse<LandingPage>> => {
    return marketingApi.patch<LandingPage>(AUDIENCES_ENDPOINTS.landingPageDetail(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(AUDIENCES_ENDPOINTS.landingPageDetail(id));
  },

  publish: async (id: string): Promise<ApiResponse<LandingPage>> => {
    return marketingApi.post<LandingPage>(`${AUDIENCES_ENDPOINTS.landingPageDetail(id)}/publish`);
  },

  getAnalytics: async (id: string): Promise<ApiResponse<{ views: number; conversions: number; conversionRate: number }>> => {
    return marketingApi.get<{ views: number; conversions: number; conversionRate: number }>(`${AUDIENCES_ENDPOINTS.landingPageDetail(id)}/analytics`);
  },

  duplicate: async (id: string): Promise<ApiResponse<LandingPage>> => {
    return marketingApi.post<LandingPage>(`${AUDIENCES_ENDPOINTS.landingPageDetail(id)}/duplicate`);
  },
};
