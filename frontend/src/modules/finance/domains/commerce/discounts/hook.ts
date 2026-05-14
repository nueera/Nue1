// @ts-nocheck
// Discounts Hooks — Zoho Commerce
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { discountsService } from './service';
import { discountsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Discount } from './types';

export function useDiscountsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: discountsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => discountsService.getAll(params) });
}

export function useDiscount(id: string) {
  return useQuery({ queryKey: discountsKeys.detail(id), queryFn: () => discountsService.getById(id), enabled: !!id });
}

export function useCreateDiscount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: discountsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: discountsKeys.all }); } });
}

export function useUpdateDiscount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Discount> }) => discountsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: discountsKeys.all }); } });
}

export function useDeleteDiscount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: discountsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: discountsKeys.all }); } });
}

export function useDiscountsStats() {
  return useQuery({ queryKey: discountsKeys.stats(), queryFn: () => discountsService.getStats() });
}

