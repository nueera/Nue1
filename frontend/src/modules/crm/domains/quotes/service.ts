import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Quote } from "./types";

export const quotesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Quote>>(`/quotes`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Quote>>(`/quotes/${id}`),
  create: (data: Partial<Quote>) =>
    crmApiClient.post<ApiResponse<Quote>>(`/quotes`, data),
  update: (id: string, data: Partial<Quote>) =>
    crmApiClient.put<ApiResponse<Quote>>(`/quotes/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/quotes/${id}`),
};