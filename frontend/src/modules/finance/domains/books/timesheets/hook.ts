// @ts-nocheck
// ============================================================================
// Timesheets — Hooks
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { timesheetService } from './service';
import { timesheetKeys } from './query-keys';
import type { TimeEntry } from './types';

export function useTimeEntries(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: timesheetKeys.list(params || {}), queryFn: () => timesheetService.getAll(params) });
}

export function useTimeEntry(id: string) {
  return useQuery({ queryKey: timesheetKeys.detail(id), queryFn: () => timesheetService.getById(id), enabled: !!id });
}

export function useWeeklyTimesheet(employeeId: string, weekStart: string) {
  return useQuery({ queryKey: timesheetKeys.weekly(employeeId, weekStart), queryFn: () => timesheetService.getWeeklyTimesheet(employeeId, weekStart), enabled: !!employeeId && !!weekStart });
}

export function useCreateTimeEntry() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: timesheetService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: timesheetKeys.all }); } });
}

export function useUpdateTimeEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TimeEntry> }) => timesheetService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: timesheetKeys.all }); },
  });
}

export function useDeleteTimeEntry() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: timesheetService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: timesheetKeys.all }); } });
}

export function useApproveTimeEntry() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: timesheetService.approve, onSuccess: () => { qc.invalidateQueries({ queryKey: timesheetKeys.all }); } });
}

export function useRejectTimeEntry() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, reason }: { id: string; reason?: string }) => timesheetService.reject(id, reason), onSuccess: () => { qc.invalidateQueries({ queryKey: timesheetKeys.all }); } });
}
