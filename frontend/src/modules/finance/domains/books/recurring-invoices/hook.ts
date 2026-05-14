// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recurringInvoiceService } from './service';
import { recurringInvoiceKeys } from './query-keys';
import type { RecurringInvoice } from './types';

export function useRecurringInvoices(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: recurringInvoiceKeys.list(params || {}), queryFn: () => recurringInvoiceService.getAll(params) });
}

export function useRecurringInvoice(id: string) {
  return useQuery({ queryKey: recurringInvoiceKeys.detail(id), queryFn: () => recurringInvoiceService.getById(id), enabled: !!id });
}

export function useCreateRecurringInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: recurringInvoiceService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: recurringInvoiceKeys.all }); } });
}

export function useUpdateRecurringInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<RecurringInvoice> }) => recurringInvoiceService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: recurringInvoiceKeys.all }); } });
}

export function useDeleteRecurringInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: recurringInvoiceService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: recurringInvoiceKeys.all }); } });
}

export function usePauseRecurringInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: recurringInvoiceService.pause, onSuccess: () => { qc.invalidateQueries({ queryKey: recurringInvoiceKeys.all }); } });
}

export function useResumeRecurringInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: recurringInvoiceService.resume, onSuccess: () => { qc.invalidateQueries({ queryKey: recurringInvoiceKeys.all }); } });
}
