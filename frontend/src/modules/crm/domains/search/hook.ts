// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { searchService } from "./service";
import { searchKeys } from "./query-keys";

export function useSearchResults(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: searchKeys.list(params || {}), queryFn: () => searchService.getAll(params) });
}

export function useSearchResult(id: string) {
  return useQuery({ queryKey: searchKeys.detail(id), queryFn: () => searchService.getById(id), enabled: !!id });
}

export function useCreateSearchResult() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: searchService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: searchKeys.all }); } });
}

export function useUpdateSearchResult() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<SearchResult> }) => searchService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: searchKeys.all }); } });
}

export function useDeleteSearchResult() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: searchService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: searchKeys.all }); } });
}