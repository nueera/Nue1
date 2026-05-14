// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pricebooksService } from "./service";
import { priceBooksKeys } from "./query-keys";

export function usePriceBooks(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: priceBooksKeys.list(params || {}), queryFn: () => pricebooksService.getAll(params) });
}

export function usePriceBook(id: string) {
  return useQuery({ queryKey: priceBooksKeys.detail(id), queryFn: () => pricebooksService.getById(id), enabled: !!id });
}

export function useCreatePriceBook() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: pricebooksService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: priceBooksKeys.all }); } });
}

export function useUpdatePriceBook() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<PriceBook> }) => pricebooksService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: priceBooksKeys.all }); } });
}

export function useDeletePriceBook() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: pricebooksService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: priceBooksKeys.all }); } });
}