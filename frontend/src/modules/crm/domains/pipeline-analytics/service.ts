// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { PipelineSnapshot } from "./types";

export const pipelineanalyticsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<PipelineSnapshot>>(`/pipeline-analytics`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<PipelineSnapshot>>(`/pipeline-analytics/${id}`),
  create: (data: Partial<PipelineSnapshot>) =>
    crmApiClient.post<ApiResponse<PipelineSnapshot>>(`/pipeline-analytics`, data),
  update: (id: string, data: Partial<PipelineSnapshot>) =>
    crmApiClient.put<ApiResponse<PipelineSnapshot>>(`/pipeline-analytics/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/pipeline-analytics/${id}`),
};