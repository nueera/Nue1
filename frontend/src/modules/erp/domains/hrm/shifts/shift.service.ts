import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { ShiftType, ShiftRequest, ShiftAssignment } from '../types';

type ServiceParams = Record<string, string | number | boolean | undefined>;

export const shiftService = {
  getShiftTypes: (params?: ServiceParams) =>
    apiClient.get<ApiResponse<ShiftType[]>>('/shifts/types', params),

  getShiftType: (id: string) =>
    apiClient.get<ApiResponse<ShiftType>>(`/shifts/types/${id}`),

  createShiftType: (data: Partial<ShiftType>) =>
    apiClient.post<ApiResponse<ShiftType>>('/shifts/types', data),

  updateShiftType: (id: string, data: Partial<ShiftType>) =>
    apiClient.put<ApiResponse<ShiftType>>(`/shifts/types/${id}`, data),

  deleteShiftType: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/shifts/types/${id}`),

  getRequests: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<ShiftRequest>>('/shifts/requests', params),

  createRequest: (data: Partial<ShiftRequest>) =>
    apiClient.post<ApiResponse<ShiftRequest>>('/shifts/requests', data),

  approveRequest: (id: string) =>
    apiClient.patch<ApiResponse<ShiftRequest>>(`/shifts/requests/${id}/approve`),

  rejectRequest: (id: string, reason: string) =>
    apiClient.patch<ApiResponse<ShiftRequest>>(`/shifts/requests/${id}/reject`, { reason }),

  getAssignments: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<ShiftAssignment>>('/shifts/assignments', params),

  createAssignment: (data: Partial<ShiftAssignment>) =>
    apiClient.post<ApiResponse<ShiftAssignment>>('/shifts/assignments', data),

  updateAssignment: (id: string, data: Partial<ShiftAssignment>) =>
    apiClient.put<ApiResponse<ShiftAssignment>>(`/shifts/assignments/${id}`, data),

  deleteAssignment: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/shifts/assignments/${id}`),
};
