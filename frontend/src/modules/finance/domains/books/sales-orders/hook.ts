// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salesOrderService } from './service';
import { salesOrderKeys } from './query-keys';
import type { SalesOrder } from './types';

export function useSalesOrders(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: salesOrderKeys.list(params || {}), queryFn: () => salesOrderService.getAll(params) });
}

export function useSalesOrder(id: string) {
  return useQuery({ queryKey: salesOrderKeys.detail(id), queryFn: () => salesOrderService.getById(id), enabled: !!id });
}

export function useCreateSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesOrderService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrderKeys.all }); } });
}

export function useUpdateSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<SalesOrder> }) => salesOrderService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrderKeys.all }); } });
}

export function useDeleteSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesOrderService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrderKeys.all }); } });
}

export function useConvertSalesOrderToInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesOrderService.convertToInvoice, onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrderKeys.all }); } });
}
