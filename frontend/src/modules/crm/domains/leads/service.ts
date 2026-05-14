// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Lead, LeadConversionData, LeadScore } from "./types";
export const leadService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) => crmApiClient.get<PaginatedResponse<Lead>>("/leads", params),
  getById: (id: string) => crmApiClient.get<ApiResponse<Lead>>(`/leads/${id}`),
  create: (data: Partial<Lead>) => crmApiClient.post<ApiResponse<Lead>>("/leads", data),
  update: (id: string, data: Partial<Lead>) => crmApiClient.put<ApiResponse<Lead>>(`/leads/${id}`, data),
  delete: (id: string) => crmApiClient.delete<ApiResponse<void>>(`/leads/${id}`),
  convertToContact: (id: string, data: LeadConversionData) => crmApiClient.post<ApiResponse<LeadConversionData>>(`/leads/${id}/convert`, data),
  massUpdate: (ids: string[], data: Partial<Lead>) => crmApiClient.patch<ApiResponse<void>>("/leads/mass-update", { ids, data }),
  massDelete: (ids: string[]) => crmApiClient.post<ApiResponse<void>>("/leads/mass-delete", { ids }),
  duplicateCheck: (email: string) => crmApiClient.get<ApiResponse<Lead[]>>("/leads/duplicates", { email }),
  assignLead: (id: string, userId: string) => crmApiClient.patch<ApiResponse<Lead>>(`/leads/${id}/assign`, { assignedTo: userId }),
  scoreLead: (id: string) => crmApiClient.get<ApiResponse<LeadScore>>(`/leads/${id}/score`),
  exportLeads: (params?: Record<string, string | number | boolean | undefined>) => crmApiClient.get<Blob>("/leads/export", params),
  importLeads: (data: FormData) => crmApiClient.post<ApiResponse<{ imported: number; skipped: number; errors: number }>>("/leads/import", data),
  getStats: () => crmApiClient.get<ApiResponse<{ total: number; byStatus: Record<string, number>; bySource: Record<string, number> }>>("/leads/stats"),
};