// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Vendor } from "./types";

export const vendorsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Vendor>>(`/vendors`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Vendor>>(`/vendors/${id}`),
  create: (data: Partial<Vendor>) =>
    crmApiClient.post<ApiResponse<Vendor>>(`/vendors`, data),
  update: (id: string, data: Partial<Vendor>) =>
    crmApiClient.put<ApiResponse<Vendor>>(`/vendors/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/vendors/${id}`),
};