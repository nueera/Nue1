import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { LeaveRequest, LeaveBalance } from '../types';

export const leaveService = {
  getRequests: (params?: Record<string, string | number | boolean | undefined>) =>
    apiClient.get<PaginatedResponse<LeaveRequest>>('/leaves', params),

  getBalances: (userId: string) =>
    apiClient.get<ApiResponse<LeaveBalance[]>>(`/leaves/balances/${userId}`),

  apply: (data: Partial<LeaveRequest>) =>
    apiClient.post<ApiResponse<LeaveRequest>>('/leaves', data),

  approve: (id: string) =>
    apiClient.patch<ApiResponse<LeaveRequest>>(`/leaves/${id}/approve`),

  reject: (id: string, reason: string) =>
    apiClient.patch<ApiResponse<LeaveRequest>>(`/leaves/${id}/reject`, { reason }),
};
