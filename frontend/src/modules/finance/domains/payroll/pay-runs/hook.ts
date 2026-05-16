// PayRuns Hooks — Zoho Payroll
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { payRunsService } from './service';
import { payRunsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { PayRun } from './types';

export function usePayRunsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: payRunsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => payRunsService.getAll(params) });
}

export function usePayRun(id: string) {
  return useQuery({ queryKey: payRunsKeys.detail(id), queryFn: () => payRunsService.getById(id), enabled: !!id });
}

export function useCreatePayRun() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: payRunsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: payRunsKeys.all }); } });
}

export function usePayRunsStats() {
  return useQuery({ queryKey: payRunsKeys.stats(), queryFn: () => payRunsService.getStats() });
}

