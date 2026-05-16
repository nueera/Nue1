import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { SMSMessage } from "./types";

export const smsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<SMSMessage>>(`/sms`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<SMSMessage>>(`/sms/${id}`),
  create: (data: Partial<SMSMessage>) =>
    crmApiClient.post<ApiResponse<SMSMessage>>(`/sms`, data),
  update: (id: string, data: Partial<SMSMessage>) =>
    crmApiClient.put<ApiResponse<SMSMessage>>(`/sms/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/sms/${id}`),
};