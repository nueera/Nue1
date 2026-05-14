// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { ImportJob } from "./types";

export const importService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<ImportJob>>(`/import`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<ImportJob>>(`/import/${id}`),
  create: (data: Partial<ImportJob>) =>
    crmApiClient.post<ApiResponse<ImportJob>>(`/import`, data),
  update: (id: string, data: Partial<ImportJob>) =>
    crmApiClient.put<ApiResponse<ImportJob>>(`/import/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/import/${id}`),
};