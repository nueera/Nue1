import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Activity } from "./types";

export const activitiesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Activity>>(`/activities`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Activity>>(`/activities/${id}`),
  create: (data: Partial<Activity>) =>
    crmApiClient.post<ApiResponse<Activity>>(`/activities`, data),
  update: (id: string, data: Partial<Activity>) =>
    crmApiClient.put<ApiResponse<Activity>>(`/activities/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/activities/${id}`),
};