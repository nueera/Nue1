import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { ReportConfig, CustomReport, SavedReport } from '../types';

type ServiceParams = Record<string, string | number | boolean | undefined>;

export const reportService = {
  // Report Configs (built-in reports)
  getConfigs: () =>
    apiClient.get<ApiResponse<ReportConfig[]>>('/reports/configs'),

  getConfig: (id: string) =>
    apiClient.get<ApiResponse<ReportConfig>>(`/reports/configs/${id}`),

  // Report Data
  getReportData: (reportId: string, params?: ServiceParams) =>
    apiClient.get<ApiResponse<Record<string, unknown>[]>>(`/reports/data/${reportId}`, params),

  // Custom Reports
  getCustomReports: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<CustomReport>>('/reports/custom', params),

  getCustomReport: (id: string) =>
    apiClient.get<ApiResponse<CustomReport>>(`/reports/custom/${id}`),

  createCustomReport: (data: Partial<CustomReport>) =>
    apiClient.post<ApiResponse<CustomReport>>('/reports/custom', data),

  updateCustomReport: (id: string, data: Partial<CustomReport>) =>
    apiClient.put<ApiResponse<CustomReport>>(`/reports/custom/${id}`, data),

  deleteCustomReport: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/reports/custom/${id}`),

  // Saved Reports
  getSavedReports: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<SavedReport>>('/reports/saved', params),

  getSavedReport: (id: string) =>
    apiClient.get<ApiResponse<SavedReport>>(`/reports/saved/${id}`),

  saveReport: (data: Partial<SavedReport>) =>
    apiClient.post<ApiResponse<SavedReport>>('/reports/saved', data),

  deleteSavedReport: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/reports/saved/${id}`),

  // Scheduling
  getScheduled: () =>
    apiClient.get<ApiResponse<SavedReport[]>>('/reports/scheduled'),

  scheduleReport: (data: Partial<SavedReport>) =>
    apiClient.post<ApiResponse<SavedReport>>('/reports/schedule', data),

  updateSchedule: (id: string, data: Partial<SavedReport>) =>
    apiClient.put<ApiResponse<SavedReport>>(`/reports/schedule/${id}`, data),

  cancelSchedule: (id: string) =>
    apiClient.patch<ApiResponse<void>>(`/reports/schedule/${id}/cancel`),

  // Export
  exportReport: (reportId: string, format: string, params?: ServiceParams) =>
    apiClient.post<ApiResponse<{ url: string }>>(`/reports/export/${reportId}`, { format, ...params }),
};
