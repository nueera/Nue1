// ============================================================================
// Projects — Service
// ============================================================================

import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Project } from './types';

export const projectService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Project>>('/books/projects', params),

  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Project>>(`/books/projects/${id}`),

  create: (data: Partial<Project>) =>
    financeApiClient.post<ApiResponse<Project>>('/books/projects', data),

  update: (id: string, data: Partial<Project>) =>
    financeApiClient.put<ApiResponse<Project>>(`/books/projects/${id}`, data),

  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/projects/${id}`),

  getStats: () =>
    financeApiClient.get<ApiResponse<{ active: number; completed: number; totalBudget: number; totalBilled: number }>>('/books/projects/stats'),

  updateProgress: (id: string, progress: number) =>
    financeApiClient.post<ApiResponse<void>>(`/books/projects/${id}/progress`, { progress }),
};
