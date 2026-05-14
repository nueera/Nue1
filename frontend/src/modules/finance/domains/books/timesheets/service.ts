// @ts-nocheck
// ============================================================================
// Timesheets — Service
// ============================================================================

import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { TimeEntry, Timesheet } from './types';

export const timesheetService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<TimeEntry>>('/books/timesheets', params),

  getById: (id: string) =>
    financeApiClient.get<ApiResponse<TimeEntry>>(`/books/timesheets/${id}`),

  create: (data: Partial<TimeEntry>) =>
    financeApiClient.post<ApiResponse<TimeEntry>>('/books/timesheets', data),

  update: (id: string, data: Partial<TimeEntry>) =>
    financeApiClient.put<ApiResponse<TimeEntry>>(`/books/timesheets/${id}`, data),

  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/timesheets/${id}`),

  approve: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/timesheets/${id}/approve`, {}),

  reject: (id: string, reason?: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/timesheets/${id}/reject`, { reason }),

  submitWeek: (data: { employeeId: string; weekStart: string }) =>
    financeApiClient.post<ApiResponse<Timesheet>>('/books/timesheets/submit', data),

  getWeeklyTimesheet: (employeeId: string, weekStart: string) =>
    financeApiClient.get<ApiResponse<Timesheet>>(`/books/timesheets/weekly`, { employeeId, weekStart }),
};
