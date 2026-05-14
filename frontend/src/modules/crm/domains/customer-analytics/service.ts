// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { CustomerSegment } from "./types";

export const customeranalyticsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<CustomerSegment>>(`/customer-analytics`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<CustomerSegment>>(`/customer-analytics/${id}`),
  create: (data: Partial<CustomerSegment>) =>
    crmApiClient.post<ApiResponse<CustomerSegment>>(`/customer-analytics`, data),
  update: (id: string, data: Partial<CustomerSegment>) =>
    crmApiClient.put<ApiResponse<CustomerSegment>>(`/customer-analytics/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/customer-analytics/${id}`),
};