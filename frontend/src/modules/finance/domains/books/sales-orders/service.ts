// @ts-nocheck
import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { SalesOrder } from './types';

export const salesOrderService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<SalesOrder>>('/books/sales-orders', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<SalesOrder>>(`/books/sales-orders/${id}`),
  create: (data: Partial<SalesOrder>) =>
    financeApiClient.post<ApiResponse<SalesOrder>>('/books/sales-orders', data),
  update: (id: string, data: Partial<SalesOrder>) =>
    financeApiClient.put<ApiResponse<SalesOrder>>(`/books/sales-orders/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/sales-orders/${id}`),
  convertToInvoice: (id: string) =>
    financeApiClient.post<ApiResponse<{ invoiceId: string }>>(`/books/sales-orders/${id}/convert`, {}),
  markAsShipped: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/sales-orders/${id}/ship`, {}),
};
