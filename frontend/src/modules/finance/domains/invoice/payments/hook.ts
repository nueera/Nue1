// @ts-nocheck
// Payments Hooks — Zoho Invoice
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsService } from './service';
import { paymentsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Payment } from './types';

export function usePaymentsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: paymentsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => paymentsService.getAll(params) });
}

export function usePayment(id: string) {
  return useQuery({ queryKey: paymentsKeys.detail(id), queryFn: () => paymentsService.getById(id), enabled: !!id });
}

export function useCreatePayment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: paymentsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: paymentsKeys.all }); } });
}

export function useUpdatePayment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Payment> }) => paymentsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: paymentsKeys.all }); } });
}

export function useDeletePayment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: paymentsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: paymentsKeys.all }); } });
}

export function usePaymentsStats() {
  return useQuery({ queryKey: paymentsKeys.stats(), queryFn: () => paymentsService.getStats() });
}

