// @ts-nocheck
// ============================================================================
// Contact Service — CRUD + list, updatePreferences, getTimeline, importContacts
// ============================================================================

import { marketingApi } from '../api/client';
import { LEADS_ENDPOINTS } from '../api/endpoints';
import type { MarketingContact, ContactTimeline, ContactPreference, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { CreateContactInput, UpdateContactInput } from '../schemas/contact.schema';

export const contactService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<MarketingContact>> => {
    return marketingApi.getPaginated<MarketingContact>(LEADS_ENDPOINTS.contactList, params);
  },

  getById: async (id: string): Promise<ApiResponse<MarketingContact>> => {
    return marketingApi.get<MarketingContact>(LEADS_ENDPOINTS.contactDetail(id));
  },

  create: async (data: CreateContactInput): Promise<ApiResponse<MarketingContact>> => {
    return marketingApi.post<MarketingContact>(LEADS_ENDPOINTS.contactList, data);
  },

  update: async (id: string, data: UpdateContactInput): Promise<ApiResponse<MarketingContact>> => {
    return marketingApi.patch<MarketingContact>(LEADS_ENDPOINTS.contactDetail(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(LEADS_ENDPOINTS.contactDetail(id));
  },

  updatePreferences: async (id: string, preferences: ContactPreference[]): Promise<ApiResponse<MarketingContact>> => {
    return marketingApi.patch<MarketingContact>(`${LEADS_ENDPOINTS.contactDetail(id)}/preferences`, { preferences });
  },

  getTimeline: async (id: string): Promise<ApiResponse<ContactTimeline[]>> => {
    return marketingApi.get<ContactTimeline[]>(`${LEADS_ENDPOINTS.contactDetail(id)}/timeline`);
  },

  importContacts: async (contacts: CreateContactInput[]): Promise<ApiResponse<{ imported: number; skipped: number }>> => {
    return marketingApi.post<{ imported: number; skipped: number }>(`${LEADS_ENDPOINTS.contactList}/import`, { contacts });
  },
};
