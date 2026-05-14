// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { CRMSettings } from "./types";

export const settingsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<CRMSettings>>(`/settings`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<CRMSettings>>(`/settings/${id}`),
  create: (data: Partial<CRMSettings>) =>
    crmApiClient.post<ApiResponse<CRMSettings>>(`/settings`, data),
  update: (id: string, data: Partial<CRMSettings>) =>
    crmApiClient.put<ApiResponse<CRMSettings>>(`/settings/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/settings/${id}`),
};