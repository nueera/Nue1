// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { PageLayout } from "./types";

export const pagelayoutsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<PageLayout>>(`/page-layouts`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<PageLayout>>(`/page-layouts/${id}`),
  create: (data: Partial<PageLayout>) =>
    crmApiClient.post<ApiResponse<PageLayout>>(`/page-layouts`, data),
  update: (id: string, data: Partial<PageLayout>) =>
    crmApiClient.put<ApiResponse<PageLayout>>(`/page-layouts/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/page-layouts/${id}`),
};