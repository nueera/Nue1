import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { RecurringInvoice } from './types';

export const recurringInvoiceService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<RecurringInvoice>>('/books/recurring-invoices', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<RecurringInvoice>>(`/books/recurring-invoices/${id}`),
  create: (data: Partial<RecurringInvoice>) =>
    financeApiClient.post<ApiResponse<RecurringInvoice>>('/books/recurring-invoices', data),
  update: (id: string, data: Partial<RecurringInvoice>) =>
    financeApiClient.put<ApiResponse<RecurringInvoice>>(`/books/recurring-invoices/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/recurring-invoices/${id}`),
  pause: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/recurring-invoices/${id}/pause`, {}),
  resume: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/recurring-invoices/${id}/resume`, {}),
};
