import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from './reports.service';
import { reportKeys } from './query-keys';

export function useReportConfigs() {
  return useQuery({
    queryKey: reportKeys.configs(),
    queryFn: () => reportService.getConfigs(),
  });
}

export function useReportConfig(id: string) {
  return useQuery({
    queryKey: reportKeys.config(id),
    queryFn: () => reportService.getConfig(id),
    enabled: !!id,
  });
}

export function useReportData(reportId: string, params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: reportKeys.data(reportId, params || {}),
    queryFn: () => reportService.getReportData(reportId, params),
    enabled: !!reportId,
  });
}

export function useCustomReports(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: reportKeys.custom(params || {}),
    queryFn: () => reportService.getCustomReports(params),
  });
}

export function useCustomReport(id: string) {
  return useQuery({
    queryKey: reportKeys.customReport(id),
    queryFn: () => reportService.getCustomReport(id),
    enabled: !!id,
  });
}

export function useSavedReports(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: reportKeys.saved(params || {}),
    queryFn: () => reportService.getSavedReports(params),
  });
}

export function useScheduledReports() {
  return useQuery({
    queryKey: reportKeys.scheduled(),
    queryFn: () => reportService.getScheduled(),
  });
}

export function useCreateCustomReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportService.createCustomReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.all });
    },
  });
}

export function useUpdateCustomReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, string | number | boolean | undefined> }) =>
      reportService.updateCustomReport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.all });
    },
  });
}

export function useDeleteCustomReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportService.deleteCustomReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.all });
    },
  });
}

export function useScheduleReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportService.scheduleReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.all });
    },
  });
}

export function useSaveReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportService.saveReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.all });
    },
  });
}

export function useExportReport() {
  return useMutation({
    mutationFn: ({ reportId, format, params }: { reportId: string; format: string; params?: Record<string, string | number | boolean | undefined> }) =>
      reportService.exportReport(reportId, format, params),
  });
}
