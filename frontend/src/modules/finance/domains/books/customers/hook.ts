// ============================================================================
// Customers — Hooks
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from './service';
import { customerKeys } from './query-keys';
import type { Customer, CustomerStatement } from './types';

export function useCustomers(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: customerKeys.list(params || {}),
    queryFn: () => customerService.getAll(params),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => customerService.getById(id),
    enabled: !!id,
  });
}

export function useCustomerTransactions(id: string, params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: customerKeys.transactions(id),
    queryFn: () => customerService.getTransactions(id, params),
    enabled: !!id,
  });
}

export function useCustomerStatement(id: string, from: string, to: string) {
  return useQuery({
    queryKey: customerKeys.statement(id),
    queryFn: () => customerService.getStatement(id, from, to),
    enabled: !!id && !!from && !!to,
  });
}

export function useCreateCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: customerService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: customerKeys.all }); },
  });
}

export function useUpdateCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) => customerService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: customerKeys.all }); },
  });
}

export function useDeleteCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: customerService.delete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: customerKeys.all }); },
  });
}

export function useSearchCustomers(query: string) {
  return useQuery({
    queryKey: customerKeys.search(query),
    queryFn: () => customerService.search(query),
    enabled: query.length >= 2,
  });
}

export function useCustomerStats() {
  return useQuery({
    queryKey: customerKeys.stats(),
    queryFn: () => customerService.getStats(),
  });
}

export function useBulkDeleteCustomers() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: customerService.bulkDelete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: customerKeys.all }); },
  });
}

export function useExportCustomers() {
  return useMutation({ mutationFn: customerService.exportCustomers });
}
