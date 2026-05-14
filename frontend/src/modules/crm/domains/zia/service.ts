// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { ZiaConfig } from "./types";

export const ziaService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<ZiaConfig>>(`/zia`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<ZiaConfig>>(`/zia/${id}`),
  create: (data: Partial<ZiaConfig>) =>
    crmApiClient.post<ApiResponse<ZiaConfig>>(`/zia`, data),
  update: (id: string, data: Partial<ZiaConfig>) =>
    crmApiClient.put<ApiResponse<ZiaConfig>>(`/zia/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/zia/${id}`),
};