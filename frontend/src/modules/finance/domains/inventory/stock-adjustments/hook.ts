// StockAdjustments Hooks — Zoho Inventory
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stockAdjustmentsService } from './service';
import { stockAdjustmentsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { StockAdjustment } from './types';

export function useStockAdjustmentsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: stockAdjustmentsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => stockAdjustmentsService.getAll(params) });
}

export function useStockAdjustment(id: string) {
  return useQuery({ queryKey: stockAdjustmentsKeys.detail(id), queryFn: () => stockAdjustmentsService.getById(id), enabled: !!id });
}

export function useCreateStockAdjustment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: stockAdjustmentsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: stockAdjustmentsKeys.all }); } });
}

export function useUpdateStockAdjustment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<StockAdjustment> }) => stockAdjustmentsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: stockAdjustmentsKeys.all }); } });
}

