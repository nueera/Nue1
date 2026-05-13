// Invoices Hooks — Zoho Invoice
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesService } from './service';
import { invoicesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Invoice } from './types';

export function useInvoicesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: invoicesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => invoicesService.getAll(params) });
}

export function useInvoice(id: string) {
  return useQuery({ queryKey: invoicesKeys.detail(id), queryFn: () => invoicesService.getById(id), enabled: !!id });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: invoicesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); } });
}

export function useUpdateInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Invoice> }) => invoicesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); } });
}

export function useDeleteInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: invoicesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); } });
}

export function useInvoicesStats() {
  return useQuery({ queryKey: invoicesKeys.stats(), queryFn: () => invoicesService.getStats() });
}

export function useSendInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => invoicesService.send(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); },
  });
}
export function useVoidInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => invoicesService.void(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); },
  });
}
export function useRecordPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { amount: number; date: string; method: string } }) => invoicesService.recordPayment(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); },
  });
}
