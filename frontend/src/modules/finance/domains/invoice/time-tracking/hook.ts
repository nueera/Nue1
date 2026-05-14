// @ts-nocheck
// TimeTracking Hooks — Zoho Invoice
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { timeTrackingService } from './service';
import { timeTrackingKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { TimeTracking } from './types';

export function useTimeTrackingList(params?: PaginatedRequest) {
  return useQuery({ queryKey: timeTrackingKeys.list((params || {}) as Record<string, unknown>), queryFn: () => timeTrackingService.getAll(params) });
}

export function useTimeTracking(id: string) {
  return useQuery({ queryKey: timeTrackingKeys.detail(id), queryFn: () => timeTrackingService.getById(id), enabled: !!id });
}

export function useCreateTimeTracking() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: timeTrackingService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: timeTrackingKeys.all }); } });
}

export function useUpdateTimeTracking() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<TimeTracking> }) => timeTrackingService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: timeTrackingKeys.all }); } });
}

export function useDeleteTimeTracking() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: timeTrackingService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: timeTrackingKeys.all }); } });
}

