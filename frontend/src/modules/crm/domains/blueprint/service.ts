import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Blueprint } from "./types";

export const blueprintService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Blueprint>>(`/blueprint`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Blueprint>>(`/blueprint/${id}`),
  create: (data: Partial<Blueprint>) =>
    crmApiClient.post<ApiResponse<Blueprint>>(`/blueprint`, data),
  update: (id: string, data: Partial<Blueprint>) =>
    crmApiClient.put<ApiResponse<Blueprint>>(`/blueprint/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/blueprint/${id}`),
};