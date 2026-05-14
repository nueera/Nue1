// @ts-nocheck
// Addons Hooks — Zoho Billing
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addonsService } from './service';
import { addonsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Addon } from './types';

export function useAddonsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: addonsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => addonsService.getAll(params) });
}

export function useAddon(id: string) {
  return useQuery({ queryKey: addonsKeys.detail(id), queryFn: () => addonsService.getById(id), enabled: !!id });
}

export function useCreateAddon() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: addonsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: addonsKeys.all }); } });
}

export function useUpdateAddon() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Addon> }) => addonsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: addonsKeys.all }); } });
}

export function useDeleteAddon() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: addonsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: addonsKeys.all }); } });
}

