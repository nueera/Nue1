import type { SalesOrder } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { salesordersService } from "./service";
import { salesOrdersKeys } from "./query-keys";

export function useSalesOrders(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: salesOrdersKeys.list(params || {}), queryFn: () => salesordersService.getAll(params) });
}

export function useSalesOrder(id: string) {
  return useQuery({ queryKey: salesOrdersKeys.detail(id), queryFn: () => salesordersService.getById(id), enabled: !!id });
}

export function useCreateSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesordersService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrdersKeys.all }); } });
}

export function useUpdateSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<SalesOrder> }) => salesordersService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrdersKeys.all }); } });
}

export function useDeleteSalesOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesordersService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: salesOrdersKeys.all }); } });
}