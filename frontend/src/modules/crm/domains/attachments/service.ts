// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Attachment } from "./types";

export const attachmentsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Attachment>>(`/attachments`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Attachment>>(`/attachments/${id}`),
  create: (data: Partial<Attachment>) =>
    crmApiClient.post<ApiResponse<Attachment>>(`/attachments`, data),
  update: (id: string, data: Partial<Attachment>) =>
    crmApiClient.put<ApiResponse<Attachment>>(`/attachments/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/attachments/${id}`),
};