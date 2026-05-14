// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { SalesOrder } from "./types";

export const salesordersService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<SalesOrder>>(`/sales-orders`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<SalesOrder>>(`/sales-orders/${id}`),
  create: (data: Partial<SalesOrder>) =>
    crmApiClient.post<ApiResponse<SalesOrder>>(`/sales-orders`, data),
  update: (id: string, data: Partial<SalesOrder>) =>
    crmApiClient.put<ApiResponse<SalesOrder>>(`/sales-orders/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/sales-orders/${id}`),
};