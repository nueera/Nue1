import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Invoice } from "./types";

export const invoicesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Invoice>>(`/invoices`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Invoice>>(`/invoices/${id}`),
  create: (data: Partial<Invoice>) =>
    crmApiClient.post<ApiResponse<Invoice>>(`/invoices`, data),
  update: (id: string, data: Partial<Invoice>) =>
    crmApiClient.put<ApiResponse<Invoice>>(`/invoices/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/invoices/${id}`),
};