// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { QuickCreateConfig } from "./types";

export const quickcreateService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<QuickCreateConfig>>(`/quick-create`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<QuickCreateConfig>>(`/quick-create/${id}`),
  create: (data: Partial<QuickCreateConfig>) =>
    crmApiClient.post<ApiResponse<QuickCreateConfig>>(`/quick-create`, data),
  update: (id: string, data: Partial<QuickCreateConfig>) =>
    crmApiClient.put<ApiResponse<QuickCreateConfig>>(`/quick-create/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/quick-create/${id}`),
};