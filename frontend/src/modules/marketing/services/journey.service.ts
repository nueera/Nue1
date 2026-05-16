// ============================================================================
// Journey Service — CRUD + list, activate, pause, getAnalytics, duplicate
// ============================================================================

import { marketingApi } from '../api/client';
import { JOURNEYS_ENDPOINTS } from '../api/endpoints';
import type { Journey, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { JourneyConfigInput } from '../schemas/journey.schema';

export const journeyService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<Journey>> => {
    return marketingApi.getPaginated<Journey>(JOURNEYS_ENDPOINTS.list, params);
  },

  getById: async (id: string): Promise<ApiResponse<Journey>> => {
    return marketingApi.get<Journey>(JOURNEYS_ENDPOINTS.detail(id));
  },

  create: async (data: JourneyConfigInput): Promise<ApiResponse<Journey>> => {
    return marketingApi.post<Journey>(JOURNEYS_ENDPOINTS.create, data);
  },

  update: async (id: string, data: Partial<JourneyConfigInput>): Promise<ApiResponse<Journey>> => {
    return marketingApi.patch<Journey>(JOURNEYS_ENDPOINTS.update(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(JOURNEYS_ENDPOINTS.delete(id));
  },

  activate: async (id: string): Promise<ApiResponse<Journey>> => {
    return marketingApi.post<Journey>(JOURNEYS_ENDPOINTS.activate(id));
  },

  pause: async (id: string): Promise<ApiResponse<Journey>> => {
    return marketingApi.post<Journey>(JOURNEYS_ENDPOINTS.pause(id));
  },

  getAnalytics: async (id: string): Promise<ApiResponse<{ enrolledCount: number; activeCount: number; completedCount: number }>> => {
    return marketingApi.get<{ enrolledCount: number; activeCount: number; completedCount: number }>(JOURNEYS_ENDPOINTS.stats(id));
  },

  duplicate: async (id: string): Promise<ApiResponse<Journey>> => {
    return marketingApi.post<Journey>(`${JOURNEYS_ENDPOINTS.detail(id)}/duplicate`);
  },
};
