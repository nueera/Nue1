import type { PurchaseOrder } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseordersService } from "./service";
import { purchaseOrdersKeys } from "./query-keys";

export function usePurchaseOrders(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: purchaseOrdersKeys.list(params || {}), queryFn: () => purchaseordersService.getAll(params) });
}

export function usePurchaseOrder(id: string) {
  return useQuery({ queryKey: purchaseOrdersKeys.detail(id), queryFn: () => purchaseordersService.getById(id), enabled: !!id });
}

export function useCreatePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: purchaseordersService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrdersKeys.all }); } });
}

export function useUpdatePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<PurchaseOrder> }) => purchaseordersService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrdersKeys.all }); } });
}

export function useDeletePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: purchaseordersService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrdersKeys.all }); } });
}