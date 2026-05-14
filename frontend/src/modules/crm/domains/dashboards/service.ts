// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Dashboard } from "./types";

export const dashboardsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Dashboard>>(`/dashboards`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Dashboard>>(`/dashboards/${id}`),
  create: (data: Partial<Dashboard>) =>
    crmApiClient.post<ApiResponse<Dashboard>>(`/dashboards`, data),
  update: (id: string, data: Partial<Dashboard>) =>
    crmApiClient.put<ApiResponse<Dashboard>>(`/dashboards/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/dashboards/${id}`),
};