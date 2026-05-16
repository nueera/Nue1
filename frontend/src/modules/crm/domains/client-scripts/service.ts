import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { ClientScript } from "./types";

export const clientscriptsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<ClientScript>>(`/client-scripts`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<ClientScript>>(`/client-scripts/${id}`),
  create: (data: Partial<ClientScript>) =>
    crmApiClient.post<ApiResponse<ClientScript>>(`/client-scripts`, data),
  update: (id: string, data: Partial<ClientScript>) =>
    crmApiClient.put<ApiResponse<ClientScript>>(`/client-scripts/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/client-scripts/${id}`),
};