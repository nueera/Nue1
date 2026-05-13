// ============================================================================
// Audience Service — CRUD + list, addMembers, removeMembers, getGrowth, importMembers
// ============================================================================

import { marketingApi } from '../api/client';
import { AUDIENCES_ENDPOINTS } from '../api/endpoints';
import type { Audience, AudienceMember, AudienceGrowth, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';

export interface CreateAudienceInput {
  name: string;
  description?: string;
  tags?: string[];
}

export interface UpdateAudienceInput extends Partial<CreateAudienceInput> {}

export const audienceService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<Audience>> => {
    return marketingApi.getPaginated<Audience>(AUDIENCES_ENDPOINTS.list, params);
  },

  getById: async (id: string): Promise<ApiResponse<Audience>> => {
    return marketingApi.get<Audience>(AUDIENCES_ENDPOINTS.detail(id));
  },

  create: async (data: CreateAudienceInput): Promise<ApiResponse<Audience>> => {
    return marketingApi.post<Audience>(AUDIENCES_ENDPOINTS.create, data);
  },

  update: async (id: string, data: UpdateAudienceInput): Promise<ApiResponse<Audience>> => {
    return marketingApi.patch<Audience>(AUDIENCES_ENDPOINTS.update(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(AUDIENCES_ENDPOINTS.delete(id));
  },

  addMembers: async (id: string, contactIds: string[]): Promise<ApiResponse<{ added: number }>> => {
    return marketingApi.post<{ added: number }>(AUDIENCES_ENDPOINTS.addMembers(id), { contactIds });
  },

  removeMembers: async (id: string, contactIds: string[]): Promise<ApiResponse<{ removed: number }>> => {
    return marketingApi.post<{ removed: number }>(AUDIENCES_ENDPOINTS.removeMembers(id), { contactIds });
  },

  getGrowth: async (id: string): Promise<ApiResponse<AudienceGrowth[]>> => {
    return marketingApi.get<AudienceGrowth[]>(AUDIENCES_ENDPOINTS.growth(id));
  },

  importMembers: async (id: string, members: Array<{ email: string; firstName?: string; lastName?: string }>): Promise<ApiResponse<{ imported: number; skipped: number }>> => {
    return marketingApi.post<{ imported: number; skipped: number }>(`${AUDIENCES_ENDPOINTS.members(id)}/import`, { members });
  },
};
