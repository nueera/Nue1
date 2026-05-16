// PurchaseOrders Hooks — Zoho Inventory
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseOrdersService } from './service';
import { purchaseOrdersKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { PurchaseOrder } from './types';

export function usePurchaseOrdersList(params?: PaginatedRequest) {
  return useQuery({ queryKey: purchaseOrdersKeys.list((params || {}) as Record<string, unknown>), queryFn: () => purchaseOrdersService.getAll(params) });
}

export function usePurchaseOrder(id: string) {
  return useQuery({ queryKey: purchaseOrdersKeys.detail(id), queryFn: () => purchaseOrdersService.getById(id), enabled: !!id });
}

export function useCreatePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: purchaseOrdersService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrdersKeys.all }); } });
}

export function useUpdatePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<PurchaseOrder> }) => purchaseOrdersService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrdersKeys.all }); } });
}

export function useDeletePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: purchaseOrdersService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseOrdersKeys.all }); } });
}

