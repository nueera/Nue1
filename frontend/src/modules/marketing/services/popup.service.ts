// @ts-nocheck
// ============================================================================
// Popup Service — CRUD + list, getAnalytics, duplicate
// ============================================================================

import { marketingApi } from '../api/client';
import { AUDIENCES_ENDPOINTS } from '../api/endpoints';
import type { Popup, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { CreatePopupInput } from '../schemas/popup.schema';

export const popupService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<Popup>> => {
    return marketingApi.getPaginated<Popup>(AUDIENCES_ENDPOINTS.popupList, params);
  },

  getById: async (id: string): Promise<ApiResponse<Popup>> => {
    return marketingApi.get<Popup>(AUDIENCES_ENDPOINTS.popupDetail(id));
  },

  create: async (data: CreatePopupInput): Promise<ApiResponse<Popup>> => {
    return marketingApi.post<Popup>(AUDIENCES_ENDPOINTS.popupList, data);
  },

  update: async (id: string, data: Partial<CreatePopupInput>): Promise<ApiResponse<Popup>> => {
    return marketingApi.patch<Popup>(AUDIENCES_ENDPOINTS.popupDetail(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(AUDIENCES_ENDPOINTS.popupDetail(id));
  },

  getAnalytics: async (id: string): Promise<ApiResponse<{ views: number; conversions: number; conversionRate: number }>> => {
    return marketingApi.get<{ views: number; conversions: number; conversionRate: number }>(`${AUDIENCES_ENDPOINTS.popupDetail(id)}/analytics`);
  },

  duplicate: async (id: string): Promise<ApiResponse<Popup>> => {
    return marketingApi.post<Popup>(`${AUDIENCES_ENDPOINTS.popupDetail(id)}/duplicate`);
  },
};
