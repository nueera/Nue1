// @ts-nocheck
// ============================================================================
// Reports — Service
// ============================================================================

import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Report, ReportData, ReportRun, ReportFormat, ReportType } from './types';

export const reportService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Report>>('/books/reports', params),

  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Report>>(`/books/reports/${id}`),

  generate: (type: ReportType, dateRange: { from: string; to: string }, format?: ReportFormat) =>
    financeApiClient.post<ApiResponse<ReportRun>>('/books/reports/generate', { type, dateRange, format }),

  getReportData: (type: ReportType, dateRange: { from: string; to: string }) =>
    financeApiClient.get<ApiResponse<ReportData>>('/books/reports/data', { type, from: dateRange.from, to: dateRange.to }),

  getRuns: (reportId: string, params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<ReportRun>>(`/books/reports/${reportId}/runs`, params),

  schedule: (id: string, data: { frequency: string; emails: string[] }) =>
    financeApiClient.post<ApiResponse<void>>(`/books/reports/${id}/schedule`, data),

  unschedule: (id: string) =>
    financeApiClient.post<ApiResponse<void>>(`/books/reports/${id}/unschedule`, {}),

  download: (runId: string) =>
    financeApiClient.get<Blob>(`/books/reports/runs/${runId}/download`),
};
