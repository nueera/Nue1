// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Case } from "./types";

export const casesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Case>>(`/cases`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Case>>(`/cases/${id}`),
  create: (data: Partial<Case>) =>
    crmApiClient.post<ApiResponse<Case>>(`/cases`, data),
  update: (id: string, data: Partial<Case>) =>
    crmApiClient.put<ApiResponse<Case>>(`/cases/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/cases/${id}`),
};