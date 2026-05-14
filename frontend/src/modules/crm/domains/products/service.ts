// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Product } from "./types";

export const productsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Product>>(`/products`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Product>>(`/products/${id}`),
  create: (data: Partial<Product>) =>
    crmApiClient.post<ApiResponse<Product>>(`/products`, data),
  update: (id: string, data: Partial<Product>) =>
    crmApiClient.put<ApiResponse<Product>>(`/products/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/products/${id}`),
};