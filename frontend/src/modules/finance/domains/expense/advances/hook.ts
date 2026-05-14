// @ts-nocheck
// Advances Hooks — Zoho Expense
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { advancesService } from './service';
import { advancesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Advance } from './types';

export function useAdvancesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: advancesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => advancesService.getAll(params) });
}

export function useAdvance(id: string) {
  return useQuery({ queryKey: advancesKeys.detail(id), queryFn: () => advancesService.getById(id), enabled: !!id });
}

export function useCreateAdvance() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: advancesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: advancesKeys.all }); } });
}

export function useAdvancesStats() {
  return useQuery({ queryKey: advancesKeys.stats(), queryFn: () => advancesService.getStats() });
}

