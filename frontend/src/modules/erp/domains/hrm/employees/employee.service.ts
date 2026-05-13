import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { Employee } from '../types';

export const employeeService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    apiClient.get<PaginatedResponse<Employee>>('/employees', params),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Employee>>(`/employees/${id}`),

  create: (data: Partial<Employee>) =>
    apiClient.post<ApiResponse<Employee>>('/employees', data),

  update: (id: string, data: Partial<Employee>) =>
    apiClient.put<ApiResponse<Employee>>(`/employees/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/employees/${id}`),
};
