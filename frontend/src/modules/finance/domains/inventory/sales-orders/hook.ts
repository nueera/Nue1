// SalesOrders Hooks — Zoho Inventory
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salesOrdersService } from './service';
import { salesOrdersKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { SalesOrder } from './types';

export function useSalesOrdersList(params?: PaginatedRequest) {
  return useQuery({ queryKey: salesOrdersKeys.list((params || {}) as Record<string, unknown>), queryFn: () => salesOrdersService.getAll(params) });
}

export function useSalesOrder(id: string) {
  return useQuery({ queryKey: salesOrdersKeys.detail(id), queryFn: () => salesOrdersService.getById(id), enabled: !!id });
}

export function useCreateSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesOrdersService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrdersKeys.all }); } });
}

export function useUpdateSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<SalesOrder> }) => salesOrdersService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrdersKeys.all }); } });
}

export function useDeleteSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesOrdersService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrdersKeys.all }); } });
}

