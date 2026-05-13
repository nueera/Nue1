import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Journey } from "./types";

export const journeyorchestrationService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Journey>>(`/journeys`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Journey>>(`/journeys/${id}`),
  create: (data: Partial<Journey>) =>
    crmApiClient.post<ApiResponse<Journey>>(`/journeys`, data),
  update: (id: string, data: Partial<Journey>) =>
    crmApiClient.put<ApiResponse<Journey>>(`/journeys/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/journeys/${id}`),
};