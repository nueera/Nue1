// ============================================================================
// Lead Service — CRUD + list, convertToContact, mergeLeads, importLeads, getTimeline
// ============================================================================

import { marketingApi } from '../api/client';
import { LEADS_ENDPOINTS } from '../api/endpoints';
import type { Lead, LeadActivity, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { CreateLeadInput, UpdateLeadInput, ImportLeadInput } from '../schemas/lead.schema';

export const leadService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<Lead>> => {
    return marketingApi.getPaginated<Lead>(LEADS_ENDPOINTS.list, params);
  },

  getById: async (id: string): Promise<ApiResponse<Lead>> => {
    return marketingApi.get<Lead>(LEADS_ENDPOINTS.detail(id));
  },

  create: async (data: CreateLeadInput): Promise<ApiResponse<Lead>> => {
    return marketingApi.post<Lead>(LEADS_ENDPOINTS.create, data);
  },

  update: async (id: string, data: UpdateLeadInput): Promise<ApiResponse<Lead>> => {
    return marketingApi.patch<Lead>(LEADS_ENDPOINTS.update(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(LEADS_ENDPOINTS.delete(id));
  },

  convertToContact: async (id: string): Promise<ApiResponse<{ contactId: string }>> => {
    return marketingApi.post<{ contactId: string }>(LEADS_ENDPOINTS.convert(id));
  },

  mergeLeads: async (primaryId: string, secondaryIds: string[]): Promise<ApiResponse<Lead>> => {
    return marketingApi.post<Lead>(`${LEADS_ENDPOINTS.detail(primaryId)}/merge`, { secondaryIds });
  },

  importLeads: async (leads: ImportLeadInput[]): Promise<ApiResponse<{ imported: number; skipped: number }>> => {
    return marketingApi.post<{ imported: number; skipped: number }>(`${LEADS_ENDPOINTS.list}/import`, { leads });
  },

  getTimeline: async (id: string): Promise<ApiResponse<LeadActivity[]>> => {
    return marketingApi.get<LeadActivity[]>(LEADS_ENDPOINTS.activities(id));
  },
};
