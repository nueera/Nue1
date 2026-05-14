// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Territory } from "./types";

export const territoriesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Territory>>(`/territories`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Territory>>(`/territories/${id}`),
  create: (data: Partial<Territory>) =>
    crmApiClient.post<ApiResponse<Territory>>(`/territories`, data),
  update: (id: string, data: Partial<Territory>) =>
    crmApiClient.put<ApiResponse<Territory>>(`/territories/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/territories/${id}`),
};