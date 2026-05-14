// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { APIEndpoint } from "./types";

export const apisService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<APIEndpoint>>(`/apis`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<APIEndpoint>>(`/apis/${id}`),
  create: (data: Partial<APIEndpoint>) =>
    crmApiClient.post<ApiResponse<APIEndpoint>>(`/apis`, data),
  update: (id: string, data: Partial<APIEndpoint>) =>
    crmApiClient.put<ApiResponse<APIEndpoint>>(`/apis/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/apis/${id}`),
};