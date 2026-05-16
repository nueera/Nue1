import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Role } from "./types";

export const rolesprofilesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Role>>(`/roles`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Role>>(`/roles/${id}`),
  create: (data: Partial<Role>) =>
    crmApiClient.post<ApiResponse<Role>>(`/roles`, data),
  update: (id: string, data: Partial<Role>) =>
    crmApiClient.put<ApiResponse<Role>>(`/roles/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/roles/${id}`),
};