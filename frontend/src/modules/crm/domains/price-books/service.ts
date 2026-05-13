import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { PriceBook } from "./types";

export const pricebooksService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<PriceBook>>(`/price-books`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<PriceBook>>(`/price-books/${id}`),
  create: (data: Partial<PriceBook>) =>
    crmApiClient.post<ApiResponse<PriceBook>>(`/price-books`, data),
  update: (id: string, data: Partial<PriceBook>) =>
    crmApiClient.put<ApiResponse<PriceBook>>(`/price-books/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/price-books/${id}`),
};