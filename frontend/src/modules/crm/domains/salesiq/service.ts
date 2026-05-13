import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { ChatSession } from "./types";

export const salesiqService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<ChatSession>>(`/salesiq`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<ChatSession>>(`/salesiq/${id}`),
  create: (data: Partial<ChatSession>) =>
    crmApiClient.post<ApiResponse<ChatSession>>(`/salesiq`, data),
  update: (id: string, data: Partial<ChatSession>) =>
    crmApiClient.put<ApiResponse<ChatSession>>(`/salesiq/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/salesiq/${id}`),
};