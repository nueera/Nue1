// ============================================================================
// Accountant — Service
// ============================================================================

import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { ChartOfAccount, JournalEntry } from './types';

export const chartOfAccountService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<ChartOfAccount>>('/books/accountant/chart-of-accounts', params),

  getById: (id: string) =>
    financeApiClient.get<ApiResponse<ChartOfAccount>>(`/books/accountant/chart-of-accounts/${id}`),

  getTree: () =>
    financeApiClient.get<ApiResponse<ChartOfAccount[]>>('/books/accountant/chart-of-accounts/tree'),

  create: (data: Partial<ChartOfAccount>) =>
    financeApiClient.post<ApiResponse<ChartOfAccount>>('/books/accountant/chart-of-accounts', data),

  update: (id: string, data: Partial<ChartOfAccount>) =>
    financeApiClient.put<ApiResponse<ChartOfAccount>>(`/books/accountant/chart-of-accounts/${id}`, data),

  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/accountant/chart-of-accounts/${id}`),

  activate: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/accountant/chart-of-accounts/${id}/activate`, {}),

  deactivate: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/accountant/chart-of-accounts/${id}/deactivate`, {}),

  getJournalEntries: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<JournalEntry>>('/books/accountant/journal-entries', params),

  createJournalEntry: (data: Partial<JournalEntry>) =>
    financeApiClient.post<ApiResponse<JournalEntry>>('/books/accountant/journal-entries', data),

  postJournalEntry: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/accountant/journal-entries/${id}/post`, {}),
};
