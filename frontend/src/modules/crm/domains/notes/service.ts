import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Note } from "./types";

export const notesService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Note>>(`/notes`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Note>>(`/notes/${id}`),
  create: (data: Partial<Note>) =>
    crmApiClient.post<ApiResponse<Note>>(`/notes`, data),
  update: (id: string, data: Partial<Note>) =>
    crmApiClient.put<ApiResponse<Note>>(`/notes/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/notes/${id}`),
};