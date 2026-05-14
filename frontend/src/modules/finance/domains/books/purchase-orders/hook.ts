// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseOrderService } from './service';
import { purchaseOrderKeys } from './query-keys';
import type { PurchaseOrder } from './types';

export function usePurchaseOrders(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: purchaseOrderKeys.list(params || {}), queryFn: () => purchaseOrderService.getAll(params) });
}
export function usePurchaseOrder(id: string) {
  return useQuery({ queryKey: purchaseOrderKeys.detail(id), queryFn: () => purchaseOrderService.getById(id), enabled: !!id });
}
export function useCreatePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: purchaseOrderService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrderKeys.all }); } });
}
export function useUpdatePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<PurchaseOrder> }) => purchaseOrderService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrderKeys.all }); } });
}
export function useDeletePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: purchaseOrderService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrderKeys.all }); } });
}
