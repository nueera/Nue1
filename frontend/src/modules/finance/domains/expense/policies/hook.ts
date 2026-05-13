// Policies Hooks — Zoho Expense
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { policiesService } from './service';
import { policiesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Policie } from './types';

export function usePoliciesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: policiesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => policiesService.getAll(params) });
}

export function usePolicie(id: string) {
  return useQuery({ queryKey: policiesKeys.detail(id), queryFn: () => policiesService.getById(id), enabled: !!id });
}

export function useCreatePolicie() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: policiesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: policiesKeys.all }); } });
}

export function useUpdatePolicie() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Policie> }) => policiesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: policiesKeys.all }); } });
}

export function useDeletePolicie() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: policiesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: policiesKeys.all }); } });
}

