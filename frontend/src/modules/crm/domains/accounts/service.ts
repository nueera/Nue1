// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Account } from "./types";
export const accountService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) => crmApiClient.get<PaginatedResponse<Account>>("/accounts", params),
  getById: (id: string) => crmApiClient.get<ApiResponse<Account>>(`/accounts/${id}`),
  create: (data: Partial<Account>) => crmApiClient.post<ApiResponse<Account>>("/accounts", data),
  update: (id: string, data: Partial<Account>) => crmApiClient.put<ApiResponse<Account>>(`/accounts/${id}`, data),
  delete: (id: string) => crmApiClient.delete<ApiResponse<void>>(`/accounts/${id}`),
  mergeAccounts: (data: { primaryId: string; secondaryIds: string[]; fieldResolutions?: Record<string, "primary"|"secondary"> }) => crmApiClient.post<ApiResponse<Account>>("/accounts/merge", data),
  linkToContact: (accountId: string, contactId: string) => crmApiClient.patch<ApiResponse<Account>>(`/accounts/${accountId}/link-contact`, { contactId }),
  getHierarchy: (id: string) => crmApiClient.get<ApiResponse<Account[]>>(`/accounts/${id}/hierarchy`),
  assignTerritory: (id: string, territoryId: string) => crmApiClient.patch<ApiResponse<Account>>(`/accounts/${id}/territory`, { territoryId }),
  massUpdate: (ids: string[], data: Partial<Account>) => crmApiClient.patch<ApiResponse<void>>("/accounts/mass-update", { ids, data }),
  exportAccounts: (params?: Record<string, string | number | boolean | undefined>) => crmApiClient.get<Blob>("/accounts/export", params),
  getStats: () => crmApiClient.get<ApiResponse<{ total: number; byType: Record<string, number>; byIndustry: Record<string, number> }>>("/accounts/stats"),
};