// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Contact, ContactMergeData, ContactHierarchy } from "./types";
export const contactService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) => crmApiClient.get<PaginatedResponse<Contact>>("/contacts", params),
  getById: (id: string) => crmApiClient.get<ApiResponse<Contact>>(`/contacts/${id}`),
  create: (data: Partial<Contact>) => crmApiClient.post<ApiResponse<Contact>>("/contacts", data),
  update: (id: string, data: Partial<Contact>) => crmApiClient.put<ApiResponse<Contact>>(`/contacts/${id}`, data),
  delete: (id: string) => crmApiClient.delete<ApiResponse<void>>(`/contacts/${id}`),
  mergeContacts: (data: ContactMergeData) => crmApiClient.post<ApiResponse<Contact>>("/contacts/merge", data),
  massUpdate: (ids: string[], data: Partial<Contact>) => crmApiClient.patch<ApiResponse<void>>("/contacts/mass-update", { ids, data }),
  duplicateCheck: (email: string) => crmApiClient.get<ApiResponse<Contact[]>>("/contacts/duplicates", { email }),
  linkToAccount: (contactId: string, accountId: string) => crmApiClient.patch<ApiResponse<Contact>>(`/contacts/${contactId}/link-account`, { accountId }),
  getHierarchy: (id: string) => crmApiClient.get<ApiResponse<ContactHierarchy>>(`/contacts/${id}/hierarchy`),
  exportContacts: (params?: Record<string, string | number | boolean | undefined>) => crmApiClient.get<Blob>("/contacts/export", params),
};