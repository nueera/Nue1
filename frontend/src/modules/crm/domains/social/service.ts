import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { SocialProfile } from "./types";

export const socialService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<SocialProfile>>(`/social`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<SocialProfile>>(`/social/${id}`),
  create: (data: Partial<SocialProfile>) =>
    crmApiClient.post<ApiResponse<SocialProfile>>(`/social`, data),
  update: (id: string, data: Partial<SocialProfile>) =>
    crmApiClient.put<ApiResponse<SocialProfile>>(`/social/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/social/${id}`),
};