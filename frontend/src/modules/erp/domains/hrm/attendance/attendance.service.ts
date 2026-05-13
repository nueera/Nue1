import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { AttendanceRecord, RegularizationRequest } from '../types';

export const attendanceService = {
  getDaily: (date: string) =>
    apiClient.get<PaginatedResponse<AttendanceRecord>>('/attendance/daily', { date }),

  getMonthly: (month: string) =>
    apiClient.get<PaginatedResponse<AttendanceRecord>>('/attendance/monthly', { month }),

  getSummary: () =>
    apiClient.get<ApiResponse<Record<string, number>>>('/attendance/summary'),

  createRegularization: (data: { date: string; checkIn: string; checkOut: string; reason: string }) =>
    apiClient.post<ApiResponse<RegularizationRequest>>('/attendance/regularization', data),
};
