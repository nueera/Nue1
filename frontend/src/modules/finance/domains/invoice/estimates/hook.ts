// @ts-nocheck
// Estimates Hooks — Zoho Invoice
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { estimatesService } from './service';
import { estimatesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Estimate } from './types';

export function useEstimatesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: estimatesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => estimatesService.getAll(params) });
}

export function useEstimate(id: string) {
  return useQuery({ queryKey: estimatesKeys.detail(id), queryFn: () => estimatesService.getById(id), enabled: !!id });
}

export function useCreateEstimate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: estimatesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: estimatesKeys.all }); } });
}

export function useUpdateEstimate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Estimate> }) => estimatesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: estimatesKeys.all }); } });
}

export function useDeleteEstimate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: estimatesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: estimatesKeys.all }); } });
}

export function useEstimatesStats() {
  return useQuery({ queryKey: estimatesKeys.stats(), queryFn: () => estimatesService.getStats() });
}

export function useConvertEstimate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => estimatesService.convertToInvoice(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: estimatesKeys.all }); },
  });
}
export function useSendEstimate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => estimatesService.send(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: estimatesKeys.all }); },
  });
}
