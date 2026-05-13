import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { DelugeFunction } from "./types";

export const functionsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<DelugeFunction>>(`/functions`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<DelugeFunction>>(`/functions/${id}`),
  create: (data: Partial<DelugeFunction>) =>
    crmApiClient.post<ApiResponse<DelugeFunction>>(`/functions`, data),
  update: (id: string, data: Partial<DelugeFunction>) =>
    crmApiClient.put<ApiResponse<DelugeFunction>>(`/functions/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/functions/${id}`),
};