import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { SearchResult } from "./types";

export const searchService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<SearchResult>>(`/search`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<SearchResult>>(`/search/${id}`),
  create: (data: Partial<SearchResult>) =>
    crmApiClient.post<ApiResponse<SearchResult>>(`/search`, data),
  update: (id: string, data: Partial<SearchResult>) =>
    crmApiClient.put<ApiResponse<SearchResult>>(`/search/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/search/${id}`),
};