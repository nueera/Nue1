// @ts-nocheck
// ============================================================================
// Vendors — Hooks
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorService } from './service';
import { vendorKeys } from './query-keys';
import type { Vendor } from './types';

export function useVendors(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: vendorKeys.list(params || {}),
    queryFn: () => vendorService.getAll(params),
  });
}

export function useVendor(id: string) {
  return useQuery({
    queryKey: vendorKeys.detail(id),
    queryFn: () => vendorService.getById(id),
    enabled: !!id,
  });
}

export function useVendorTransactions(id: string, params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: vendorKeys.transactions(id),
    queryFn: () => vendorService.getTransactions(id, params),
    enabled: !!id,
  });
}

export function useCreateVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: vendorService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: vendorKeys.all }); },
  });
}

export function useUpdateVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Vendor> }) => vendorService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: vendorKeys.all }); },
  });
}

export function useDeleteVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: vendorService.delete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: vendorKeys.all }); },
  });
}

export function useSearchVendors(query: string) {
  return useQuery({
    queryKey: vendorKeys.search(query),
    queryFn: () => vendorService.search(query),
    enabled: query.length >= 2,
  });
}

export function useVendorStats() {
  return useQuery({
    queryKey: vendorKeys.stats(),
    queryFn: () => vendorService.getStats(),
  });
}
