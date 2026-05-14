// @ts-nocheck
import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Payment } from './types';

export const paymentService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Payment>>('/books/payments', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Payment>>(`/books/payments/${id}`),
  create: (data: Partial<Payment>) =>
    financeApiClient.post<ApiResponse<Payment>>('/books/payments', data),
  update: (id: string, data: Partial<Payment>) =>
    financeApiClient.put<ApiResponse<Payment>>(`/books/payments/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/payments/${id}`),
  refund: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/payments/${id}/refund`, {}),
};
