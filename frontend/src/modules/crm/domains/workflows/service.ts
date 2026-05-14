// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Workflow } from "./types";

export const workflowsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Workflow>>(`/workflows`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Workflow>>(`/workflows/${id}`),
  create: (data: Partial<Workflow>) =>
    crmApiClient.post<ApiResponse<Workflow>>(`/workflows`, data),
  update: (id: string, data: Partial<Workflow>) =>
    crmApiClient.put<ApiResponse<Workflow>>(`/workflows/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/workflows/${id}`),
};