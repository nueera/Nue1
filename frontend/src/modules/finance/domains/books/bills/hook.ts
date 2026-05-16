import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { billService } from './service';
import { billKeys } from './query-keys';
import type { Bill } from './types';

export function useBills(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: billKeys.list(params || {}), queryFn: () => billService.getAll(params) });
}
export function useBill(id: string) {
  return useQuery({ queryKey: billKeys.detail(id), queryFn: () => billService.getById(id), enabled: !!id });
}
export function useCreateBill() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: billService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: billKeys.all }); } });
}
export function useUpdateBill() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Bill> }) => billService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: billKeys.all }); } });
}
export function useDeleteBill() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: billService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: billKeys.all }); } });
}
export function useMarkBillAsPaid() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: billService.markAsPaid, onSuccess: () => { qc.invalidateQueries({ queryKey: billKeys.all }); } });
}
