import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceService } from './service';
import { invoiceKeys } from './query-keys';
import type { Invoice } from './types';

export function useInvoices(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: invoiceKeys.list(params || {}), queryFn: () => invoiceService.getAll(params) });
}

export function useInvoice(id: string) {
  return useQuery({ queryKey: invoiceKeys.detail(id), queryFn: () => invoiceService.getById(id), enabled: !!id });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: invoiceService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); } });
}

export function useUpdateInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Invoice> }) => invoiceService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); } });
}

export function useDeleteInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: invoiceService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); } });
}

export function useSendInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data?: { email?: string; message?: string } }) => invoiceService.send(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); } });
}

export function useMarkInvoiceAsPaid() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: invoiceService.markAsPaid, onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); } });
}

export function useVoidInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: invoiceService.void, onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); } });
}

export function useRecordPayment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: { amount: number; date: string; paymentMethod: string; reference?: string; notes?: string } }) => invoiceService.recordPayment(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); } });
}

export function useInvoiceStats() {
  return useQuery({ queryKey: invoiceKeys.stats(), queryFn: () => invoiceService.getStats() });
}
