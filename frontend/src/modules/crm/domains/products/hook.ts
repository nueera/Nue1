// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "./service";
import { productsKeys } from "./query-keys";

export function useProducts(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: productsKeys.list(params || {}), queryFn: () => productsService.getAll(params) });
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