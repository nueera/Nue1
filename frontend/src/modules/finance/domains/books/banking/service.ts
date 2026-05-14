// @ts-nocheck
// ============================================================================
// Banking — Service
// ============================================================================

import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { BankAccount, BankTransaction, ReconciliationMatch } from './types';

export const bankAccountService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<BankAccount>>('/books/banking', params),

  getById: (id: string) =>
    financeApiClient.get<ApiResponse<BankAccount>>(`/books/banking/${id}`),

  create: (data: Partial<BankAccount>) =>
    financeApiClient.post<ApiResponse<BankAccount>>('/books/banking', data),

  update: (id: string, data: Partial<BankAccount>) =>
    financeApiClient.put<ApiResponse<BankAccount>>(`/books/banking/${id}`, data),

  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/banking/${id}`),

  getTransactions: (id: string, params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<BankTransaction>>(`/books/banking/${id}/transactions`, params),

  sync: (id: string) =>
    financeApiClient.post<ApiResponse<{ newTransactions: number }>>(`/books/banking/${id}/sync`, {}),

  getReconciliationMatches: (id: string) =>
    financeApiClient.get<ApiResponse<ReconciliationMatch[]>>(`/books/banking/${id}/reconciliation`),

  reconcile: (id: string, matchIds: string[]) =>
    financeApiClient.post<ApiResponse<void>>(`/books/banking/${id}/reconcile`, { matchIds }),
};
