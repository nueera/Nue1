// Recurring Hooks — Zoho Invoice
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recurringService } from './service';
import { recurringKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Recurring } from './types';

export function useRecurringList(params?: PaginatedRequest) {
  return useQuery({ queryKey: recurringKeys.list((params || {}) as Record<string, unknown>), queryFn: () => recurringService.getAll(params) });
}

export function useRecurring(id: string) {
  return useQuery({ queryKey: recurringKeys.detail(id), queryFn: () => recurringService.getById(id), enabled: !!id });
}

export function useCreateRecurring() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: recurringService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: recurringKeys.all }); } });
}

export function useUpdateRecurring() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Recurring> }) => recurringService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: recurringKeys.all }); } });
}

export function useDeleteRecurring() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: recurringService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: recurringKeys.all }); } });
}

