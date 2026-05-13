import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { CalendarEvent } from "./types";

export const calendarService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<CalendarEvent>>(`/calendar`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<CalendarEvent>>(`/calendar/${id}`),
  create: (data: Partial<CalendarEvent>) =>
    crmApiClient.post<ApiResponse<CalendarEvent>>(`/calendar`, data),
  update: (id: string, data: Partial<CalendarEvent>) =>
    crmApiClient.put<ApiResponse<CalendarEvent>>(`/calendar/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/calendar/${id}`),
};