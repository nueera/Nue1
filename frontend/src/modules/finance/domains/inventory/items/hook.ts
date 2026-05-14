// @ts-nocheck
// Items Hooks — Zoho Inventory
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsService } from './service';
import { itemsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Item } from './types';

export function useItemsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: itemsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => itemsService.getAll(params) });
}

export function useItem(id: string) {
  return useQuery({ queryKey: itemsKeys.detail(id), queryFn: () => itemsService.getById(id), enabled: !!id });
}

export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: itemsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: itemsKeys.all }); } });
}

export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Item> }) => itemsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: itemsKeys.all }); } });
}

export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: itemsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: itemsKeys.all }); } });
}

