import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Expense } from './types';

export const expenseService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Expense>>('/books/expenses', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Expense>>(`/books/expenses/${id}`),
  create: (data: Partial<Expense>) =>
    financeApiClient.post<ApiResponse<Expense>>('/books/expenses', data),
  update: (id: string, data: Partial<Expense>) =>
    financeApiClient.put<ApiResponse<Expense>>(`/books/expenses/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/expenses/${id}`),
  approve: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/expenses/${id}/approve`, {}),
  reject: (id: string, reason?: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/expenses/${id}/reject`, { reason }),
  uploadReceipt: (id: string, formData: FormData) =>
    financeApiClient.upload<ApiResponse<Expense>>(`/books/expenses/${id}/receipt`, formData),
};
