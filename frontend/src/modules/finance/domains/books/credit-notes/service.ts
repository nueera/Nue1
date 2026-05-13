import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { CreditNote } from './types';

export const creditNoteService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<CreditNote>>('/books/credit-notes', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<CreditNote>>(`/books/credit-notes/${id}`),
  create: (data: Partial<CreditNote>) =>
    financeApiClient.post<ApiResponse<CreditNote>>('/books/credit-notes', data),
  update: (id: string, data: Partial<CreditNote>) =>
    financeApiClient.put<ApiResponse<CreditNote>>(`/books/credit-notes/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/credit-notes/${id}`),
  applyToInvoice: (id: string, invoiceId: string, amount: number) =>
    financeApiClient.post<ApiResponse<void>>(`/books/credit-notes/${id}/apply`, { invoiceId, amount }),
  void: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/credit-notes/${id}/void`, {}),
};
