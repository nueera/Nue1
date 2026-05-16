import type { Quote } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { quotesService } from "./service";
import { quotesKeys } from "./query-keys";

export function useQuotes(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: quotesKeys.list(params || {}), queryFn: () => quotesService.getAll(params) });
}

export function useQuote(id: string) {
  return useQuery({ queryKey: quotesKeys.detail(id), queryFn: () => quotesService.getById(id), enabled: !!id });
}

export function useCreateQuote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: quotesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: quotesKeys.all }); } });
}

export function useUpdateQuote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Quote> }) => quotesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: quotesKeys.all }); } });
}

export function useDeleteQuote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: quotesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: quotesKeys.all }); } });
}