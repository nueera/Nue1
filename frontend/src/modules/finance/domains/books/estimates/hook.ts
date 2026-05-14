// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { estimateService } from './service';
import { estimateKeys } from './query-keys';
import type { Estimate } from './types';

export function useEstimates(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: estimateKeys.list(params || {}), queryFn: () => estimateService.getAll(params) });
}

export function useEstimate(id: string) {
  return useQuery({ queryKey: estimateKeys.detail(id), queryFn: () => estimateService.getById(id), enabled: !!id });
}

export function useCreateEstimate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: estimateService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: estimateKeys.all }); } });
}

export function useUpdateEstimate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Estimate> }) => estimateService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: estimateKeys.all }); } });
}

export function useDeleteEstimate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: estimateService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: estimateKeys.all }); } });
}

export function useConvertToInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: estimateService.convertToInvoice, onSuccess: () => { qc.invalidateQueries({ queryKey: estimateKeys.all }); } });
}

export function useSendEstimate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data?: { email?: string; message?: string } }) => estimateService.send(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: estimateKeys.all }); } });
}

export function useApproveEstimate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: estimateService.approve, onSuccess: () => { qc.invalidateQueries({ queryKey: estimateKeys.all }); } });
}
