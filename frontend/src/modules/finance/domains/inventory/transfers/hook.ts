// Transfers Hooks — Zoho Inventory
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transfersService } from './service';
import { transfersKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Transfer } from './types';

export function useTransfersList(params?: PaginatedRequest) {
  return useQuery({ queryKey: transfersKeys.list((params || {}) as Record<string, unknown>), queryFn: () => transfersService.getAll(params) });
}

export function useTransfer(id: string) {
  return useQuery({ queryKey: transfersKeys.detail(id), queryFn: () => transfersService.getById(id), enabled: !!id });
}

export function useCreateTransfer() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: transfersService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: transfersKeys.all }); } });
}

export function useUpdateTransfer() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Transfer> }) => transfersService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: transfersKeys.all }); } });
}

