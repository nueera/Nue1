import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from './service';
import { paymentKeys } from './query-keys';
import type { Payment } from './types';

export function usePayments(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: paymentKeys.list(params || {}), queryFn: () => paymentService.getAll(params) });
}
export function usePayment(id: string) {
  return useQuery({ queryKey: paymentKeys.detail(id), queryFn: () => paymentService.getById(id), enabled: !!id });
}
export function useCreatePayment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: paymentService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: paymentKeys.all }); } });
}
export function useUpdatePayment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Payment> }) => paymentService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: paymentKeys.all }); } });
}
export function useDeletePayment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: paymentService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: paymentKeys.all }); } });
}
export function useRefundPayment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: paymentService.refund, onSuccess: () => { qc.invalidateQueries({ queryKey: paymentKeys.all }); } });
}
