// PaymentLinks Hooks — Zoho Checkout
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentLinksService } from './service';
import { paymentLinksKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { PaymentLink } from './types';

export function usePaymentLinksList(params?: PaginatedRequest) {
  return useQuery({ queryKey: paymentLinksKeys.list((params || {}) as Record<string, unknown>), queryFn: () => paymentLinksService.getAll(params) });
}

export function usePaymentLink(id: string) {
  return useQuery({ queryKey: paymentLinksKeys.detail(id), queryFn: () => paymentLinksService.getById(id), enabled: !!id });
}

export function useCreatePaymentLink() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: paymentLinksService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: paymentLinksKeys.all }); } });
}

