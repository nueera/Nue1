// @ts-nocheck
import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Estimate } from './types';

export const estimateService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Estimate>>('/books/estimates', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Estimate>>(`/books/estimates/${id}`),
  create: (data: Partial<Estimate>) =>
    financeApiClient.post<ApiResponse<Estimate>>('/books/estimates', data),
  update: (id: string, data: Partial<Estimate>) =>
    financeApiClient.put<ApiResponse<Estimate>>(`/books/estimates/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/estimates/${id}`),
  convertToInvoice: (id: string) =>
    financeApiClient.post<ApiResponse<{ invoiceId: string }>>(`/books/estimates/${id}/convert`, {}),
  send: (id: string, data?: { email?: string; message?: string }) =>
    financeApiClient.post<ApiResponse<void>>(`/books/estimates/${id}/send`, data),
  approve: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/estimates/${id}/approve`, {}),
  decline: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/estimates/${id}/decline`, {}),
  markAsAccepted: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/estimates/${id}/accept`, {}),
};
