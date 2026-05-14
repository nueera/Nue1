// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { PurchaseOrder } from "./types";

export const purchaseordersService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<PurchaseOrder>>(`/purchase-orders`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<PurchaseOrder>>(`/purchase-orders/${id}`),
  create: (data: Partial<PurchaseOrder>) =>
    crmApiClient.post<ApiResponse<PurchaseOrder>>(`/purchase-orders`, data),
  update: (id: string, data: Partial<PurchaseOrder>) =>
    crmApiClient.put<ApiResponse<PurchaseOrder>>(`/purchase-orders/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/purchase-orders/${id}`),
};