// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Report } from "./types";

export const reportsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Report>>(`/reports`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Report>>(`/reports/${id}`),
  create: (data: Partial<Report>) =>
    crmApiClient.post<ApiResponse<Report>>(`/reports`, data),
  update: (id: string, data: Partial<Report>) =>
    crmApiClient.put<ApiResponse<Report>>(`/reports/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/reports/${id}`),
};