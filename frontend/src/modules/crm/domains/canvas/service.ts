import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { CanvasTemplate } from "./types";

export const canvasService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<CanvasTemplate>>(`/canvas`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<CanvasTemplate>>(`/canvas/${id}`),
  create: (data: Partial<CanvasTemplate>) =>
    crmApiClient.post<ApiResponse<CanvasTemplate>>(`/canvas`, data),
  update: (id: string, data: Partial<CanvasTemplate>) =>
    crmApiClient.put<ApiResponse<CanvasTemplate>>(`/canvas/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/canvas/${id}`),
};