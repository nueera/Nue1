// Coupons Hooks — Zoho Billing
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { couponsService } from './service';
import { couponsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Coupon } from './types';

export function useCouponsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: couponsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => couponsService.getAll(params) });
}

export function useCoupon(id: string) {
  return useQuery({ queryKey: couponsKeys.detail(id), queryFn: () => couponsService.getById(id), enabled: !!id });
}

export function useCreateCoupon() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: couponsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: couponsKeys.all }); } });
}

export function useUpdateCoupon() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Coupon> }) => couponsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: couponsKeys.all }); } });
}

export function useDeleteCoupon() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: couponsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: couponsKeys.all }); } });
}

export function useCouponsStats() {
  return useQuery({ queryKey: couponsKeys.stats(), queryFn: () => couponsService.getStats() });
}

