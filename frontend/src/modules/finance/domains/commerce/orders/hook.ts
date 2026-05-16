// Orders Hooks — Zoho Commerce
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from './service';
import { ordersKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Order } from './types';

export function useOrdersList(params?: PaginatedRequest) {
  return useQuery({ queryKey: ordersKeys.list((params || {}) as Record<string, unknown>), queryFn: () => ordersService.getAll(params) });
}

export function useOrder(id: string) {
  return useQuery({ queryKey: ordersKeys.detail(id), queryFn: () => ordersService.getById(id), enabled: !!id });
}

export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Order> }) => ordersService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ordersKeys.all }); } });
}

export function useOrdersStats() {
  return useQuery({ queryKey: ordersKeys.stats(), queryFn: () => ordersService.getStats() });
}

