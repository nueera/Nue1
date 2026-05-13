import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { CPQConfig } from "./types";

export const cpqService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<CPQConfig>>(`/cpq`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<CPQConfig>>(`/cpq/${id}`),
  create: (data: Partial<CPQConfig>) =>
    crmApiClient.post<ApiResponse<CPQConfig>>(`/cpq`, data),
  update: (id: string, data: Partial<CPQConfig>) =>
    crmApiClient.put<ApiResponse<CPQConfig>>(`/cpq/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/cpq/${id}`),
};