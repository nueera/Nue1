// @ts-nocheck
import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { PurchaseOrder } from './types';

export const purchaseOrderService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<PurchaseOrder>>('/books/purchase-orders', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<PurchaseOrder>>(`/books/purchase-orders/${id}`),
  create: (data: Partial<PurchaseOrder>) =>
    financeApiClient.post<ApiResponse<PurchaseOrder>>('/books/purchase-orders', data),
  update: (id: string, data: Partial<PurchaseOrder>) =>
    financeApiClient.put<ApiResponse<PurchaseOrder>>(`/books/purchase-orders/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/purchase-orders/${id}`),
  markAsReceived: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/purchase-orders/${id}/receive`, {}),
  convertToBill: (id: string) =>
    financeApiClient.post<ApiResponse<{ billId: string }>>(`/books/purchase-orders/${id}/convert`, {}),
};
