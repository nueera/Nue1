// ============================================================================
// Vendors — Service
// ============================================================================

import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Vendor, VendorTransaction } from './types';

export const vendorService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Vendor>>('/books/vendors', params),

  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Vendor>>(`/books/vendors/${id}`),

  create: (data: Partial<Vendor>) =>
    financeApiClient.post<ApiResponse<Vendor>>('/books/vendors', data),

  update: (id: string, data: Partial<Vendor>) =>
    financeApiClient.put<ApiResponse<Vendor>>(`/books/vendors/${id}`, data),

  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/vendors/${id}`),

  search: (query: string) =>
    financeApiClient.get<ApiResponse<Vendor[]>>('/books/vendors/search', { q: query }),

  getTransactions: (id: string, params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<VendorTransaction>>(`/books/vendors/${id}/transactions`, params),

  getStats: () =>
    financeApiClient.get<ApiResponse<{ total: number; active: number; inactive: number; onHold: number }>>('/books/vendors/stats'),

  bulkDelete: (ids: string[]) =>
    financeApiClient.post<ApiResponse<void>>('/books/vendors/bulk-delete', { ids }),
};
