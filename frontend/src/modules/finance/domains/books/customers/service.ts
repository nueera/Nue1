// @ts-nocheck
// ============================================================================
// Customers — Service
// ============================================================================

import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Customer, CustomerTransaction, CustomerStatement } from './types';

export const customerService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Customer>>('/books/customers', params),

  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Customer>>(`/books/customers/${id}`),

  create: (data: Partial<Customer>) =>
    financeApiClient.post<ApiResponse<Customer>>('/books/customers', data),

  update: (id: string, data: Partial<Customer>) =>
    financeApiClient.put<ApiResponse<Customer>>(`/books/customers/${id}`, data),

  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/customers/${id}`),

  search: (query: string) =>
    financeApiClient.get<ApiResponse<Customer[]>>('/books/customers/search', { q: query }),

  getTransactions: (id: string, params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<CustomerTransaction>>(`/books/customers/${id}/transactions`, params),

  getStatement: (id: string, from: string, to: string) =>
    financeApiClient.get<ApiResponse<CustomerStatement>>(`/books/customers/${id}/statement`, { from, to }),

  emailStatement: (id: string, data: { from: string; to: string; email: string }) =>
    financeApiClient.post<ApiResponse<void>>(`/books/customers/${id}/statement/email`, data),

  getStats: () =>
    financeApiClient.get<ApiResponse<{ total: number; active: number; inactive: number; onHold: number }>>('/books/customers/stats'),

  bulkDelete: (ids: string[]) =>
    financeApiClient.post<ApiResponse<void>>('/books/customers/bulk-delete', { ids }),

  exportCustomers: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<Blob>('/books/customers/export', params),

  importCustomers: (data: FormData) =>
    financeApiClient.upload<ApiResponse<{ imported: number; skipped: number; errors: number }>>('/books/customers/import', data),
};
