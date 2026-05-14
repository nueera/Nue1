// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { ForecastPeriod } from "./types";

export const forecastingService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<ForecastPeriod>>(`/forecasting`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<ForecastPeriod>>(`/forecasting/${id}`),
  create: (data: Partial<ForecastPeriod>) =>
    crmApiClient.post<ApiResponse<ForecastPeriod>>(`/forecasting`, data),
  update: (id: string, data: Partial<ForecastPeriod>) =>
    crmApiClient.put<ApiResponse<ForecastPeriod>>(`/forecasting/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/forecasting/${id}`),
};