import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { CustomModule } from "./types";

export const custommodulesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<CustomModule>>(`/custom-modules`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<CustomModule>>(`/custom-modules/${id}`),
  create: (data: Partial<CustomModule>) =>
    crmApiClient.post<ApiResponse<CustomModule>>(`/custom-modules`, data),
  update: (id: string, data: Partial<CustomModule>) =>
    crmApiClient.put<ApiResponse<CustomModule>>(`/custom-modules/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/custom-modules/${id}`),
};