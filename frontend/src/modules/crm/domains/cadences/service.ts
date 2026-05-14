// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Cadence } from "./types";

export const cadencesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Cadence>>(`/cadences`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Cadence>>(`/cadences/${id}`),
  create: (data: Partial<Cadence>) =>
    crmApiClient.post<ApiResponse<Cadence>>(`/cadences`, data),
  update: (id: string, data: Partial<Cadence>) =>
    crmApiClient.put<ApiResponse<Cadence>>(`/cadences/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/cadences/${id}`),
};