// @ts-nocheck
// Warehouses Hooks — Zoho Inventory
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { warehousesService } from './service';
import { warehousesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Warehouse } from './types';

export function useWarehousesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: warehousesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => warehousesService.getAll(params) });
}

export function useWarehouse(id: string) {
  return useQuery({ queryKey: warehousesKeys.detail(id), queryFn: () => warehousesService.getById(id), enabled: !!id });
}

export function useCreateWarehouse() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: warehousesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: warehousesKeys.all }); } });
}

export function useUpdateWarehouse() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Warehouse> }) => warehousesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: warehousesKeys.all }); } });
}

export function useDeleteWarehouse() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: warehousesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: warehousesKeys.all }); } });
}

