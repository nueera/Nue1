import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Sandbox } from "./types";

export const sandboxService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Sandbox>>(`/sandbox`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Sandbox>>(`/sandbox/${id}`),
  create: (data: Partial<Sandbox>) =>
    crmApiClient.post<ApiResponse<Sandbox>>(`/sandbox`, data),
  update: (id: string, data: Partial<Sandbox>) =>
    crmApiClient.put<ApiResponse<Sandbox>>(`/sandbox/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/sandbox/${id}`),
};