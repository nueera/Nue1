// @ts-nocheck
// Products Hooks — Zoho Commerce
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from './service';
import { productsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Product } from './types';

export function useProductsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: productsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => productsService.getAll(params) });
}

export function useProduct(id: string) {
  return useQuery({ queryKey: productsKeys.detail(id), queryFn: () => productsService.getById(id), enabled: !!id });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: productsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: productsKeys.all }); } });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => productsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: productsKeys.all }); } });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: productsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: productsKeys.all }); } });
}

