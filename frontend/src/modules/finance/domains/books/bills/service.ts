import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Bill } from './types';

export const billService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Bill>>('/books/bills', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Bill>>(`/books/bills/${id}`),
  create: (data: Partial<Bill>) =>
    financeApiClient.post<ApiResponse<Bill>>('/books/bills', data),
  update: (id: string, data: Partial<Bill>) =>
    financeApiClient.put<ApiResponse<Bill>>(`/books/bills/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/bills/${id}`),
  markAsPaid: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/bills/${id}/mark-paid`, {}),
  recordPayment: (id: string, data: { amount: number; date: string; paymentMethod: string }) =>
    financeApiClient.post<ApiResponse<{ paymentId: string }>>(`/books/bills/${id}/payments`, data),
};
