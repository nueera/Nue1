// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Widget } from "./types";

export const widgetsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Widget>>(`/widgets`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Widget>>(`/widgets/${id}`),
  create: (data: Partial<Widget>) =>
    crmApiClient.post<ApiResponse<Widget>>(`/widgets`, data),
  update: (id: string, data: Partial<Widget>) =>
    crmApiClient.put<ApiResponse<Widget>>(`/widgets/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/widgets/${id}`),
};