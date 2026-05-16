// PaymentPages Hooks — Zoho Checkout
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentPagesService } from './service';
import { paymentPagesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { PaymentPage } from './types';

export function usePaymentPagesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: paymentPagesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => paymentPagesService.getAll(params) });
}

export function usePaymentPage(id: string) {
  return useQuery({ queryKey: paymentPagesKeys.detail(id), queryFn: () => paymentPagesService.getById(id), enabled: !!id });
}

export function useCreatePaymentPage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: paymentPagesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: paymentPagesKeys.all }); } });
}

export function useUpdatePaymentPage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<PaymentPage> }) => paymentPagesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: paymentPagesKeys.all }); } });
}

export function useDeletePaymentPage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: paymentPagesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: paymentPagesKeys.all }); } });
}

