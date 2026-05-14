// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Portal } from "./types";

export const portalsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Portal>>(`/portals`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Portal>>(`/portals/${id}`),
  create: (data: Partial<Portal>) =>
    crmApiClient.post<ApiResponse<Portal>>(`/portals`, data),
  update: (id: string, data: Partial<Portal>) =>
    crmApiClient.put<ApiResponse<Portal>>(`/portals/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/portals/${id}`),
};