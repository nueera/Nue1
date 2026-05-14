// @ts-nocheck
// ============================================================================
// Reports — Hooks
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from './service';
import { reportKeys } from './query-keys';
import type { Report, ReportFormat, ReportType } from './types';

export function useReports(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: reportKeys.list(params || {}), queryFn: () => reportService.getAll(params) });
}

export function useReport(id: string) {
  return useQuery({ queryKey: reportKeys.detail(id), queryFn: () => reportService.getById(id), enabled: !!id });
}

export function useReportData(type: ReportType, dateRange: { from: string; to: string }) {
  return useQuery({ queryKey: reportKeys.data(type, dateRange.from, dateRange.to), queryFn: () => reportService.getReportData(type, dateRange), enabled: !!type && !!dateRange.from && !!dateRange.to });
}

export function useReportRuns(id: string, params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: reportKeys.runs(id), queryFn: () => reportService.getRuns(id, params), enabled: !!id });
}

export function useGenerateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ type, dateRange, format }: { type: ReportType; dateRange: { from: string; to: string }; format?: ReportFormat }) => reportService.generate(type, dateRange, format),
    onSuccess: () => { qc.invalidateQueries({ queryKey: reportKeys.all }); },
  });
}

export function useScheduleReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { frequency: string; emails: string[] } }) => reportService.schedule(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: reportKeys.all }); },
  });
}

export function useUnscheduleReport() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: reportService.unschedule, onSuccess: () => { qc.invalidateQueries({ queryKey: reportKeys.all }); } });
}
