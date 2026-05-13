import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { EmailMessage } from "./types";

export const emailService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<EmailMessage>>(`/email`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<EmailMessage>>(`/email/${id}`),
  create: (data: Partial<EmailMessage>) =>
    crmApiClient.post<ApiResponse<EmailMessage>>(`/email`, data),
  update: (id: string, data: Partial<EmailMessage>) =>
    crmApiClient.put<ApiResponse<EmailMessage>>(`/email/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/email/${id}`),
};