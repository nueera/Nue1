// Projects Service — Zoho Invoice
import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Project } from './types';

export const projectsService = {
  getAll: (params?: PaginatedRequest) => {
    return financeApiClient.get<PaginatedResponse<Project>>('/invoice/projects', params as Record<string, string | number | boolean | undefined>);
  },
  getById: (id: string) => {
    return financeApiClient.get<ApiResponse<Project>>('/invoice/projects/' + id);
  },
  create: (data: Partial<Project>) => {
    return financeApiClient.post<ApiResponse<Project>>('/invoice/projects', data);
  },
  update: (id: string, data: Partial<Project>) => {
    return financeApiClient.put<ApiResponse<Project>>('/invoice/projects/' + id, data);
  },
  delete: (id: string) => {
    return financeApiClient.delete<ApiResponse<void>>('/invoice/projects/' + id);
  },
  getTasks: (projectId: string) => {
    // TODO: Implement getTasks
    return Promise.resolve({ success: true, data: {} as never });
  },
  getTimeEntries: (projectId: string) => {
    // TODO: Implement getTimeEntries
    return Promise.resolve({ success: true, data: {} as never });
  },
};
