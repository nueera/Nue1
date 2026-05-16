import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Invoice } from './types';

export const invoiceService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Invoice>>('/books/invoices', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Invoice>>(`/books/invoices/${id}`),
  create: (data: Partial<Invoice>) =>
    financeApiClient.post<ApiResponse<Invoice>>('/books/invoices', data),
  update: (id: string, data: Partial<Invoice>) =>
    financeApiClient.put<ApiResponse<Invoice>>(`/books/invoices/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/invoices/${id}`),
  send: (id: string, data?: { email?: string; message?: string }) =>
    financeApiClient.post<ApiResponse<void>>(`/books/invoices/${id}/send`, data),
  markAsPaid: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/invoices/${id}/mark-paid`, {}),
  void: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/invoices/${id}/void`, {}),
  recordPayment: (id: string, data: { amount: number; date: string; paymentMethod: string; reference?: string; notes?: string }) =>
    financeApiClient.post<ApiResponse<{ paymentId: string }>>(`/books/invoices/${id}/payments`, data),
  getStats: () =>
    financeApiClient.get<ApiResponse<{ totalOutstanding: number; totalOverdue: number; draftCount: number; paidCount: number }>>('/books/invoices/stats'),
};
