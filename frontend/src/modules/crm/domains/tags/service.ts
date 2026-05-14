// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Tag } from "./types";

export const tagsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Tag>>(`/tags`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Tag>>(`/tags/${id}`),
  create: (data: Partial<Tag>) =>
    crmApiClient.post<ApiResponse<Tag>>(`/tags`, data),
  update: (id: string, data: Partial<Tag>) =>
    crmApiClient.put<ApiResponse<Tag>>(`/tags/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/tags/${id}`),
};