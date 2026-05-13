import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { casesService } from "./service";
import { casesKeys } from "./query-keys";

export function useCases(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: casesKeys.list(params || {}), queryFn: () => casesService.getAll(params) });
}

export function useCase(id: string) {
  return useQuery({ queryKey: casesKeys.detail(id), queryFn: () => casesService.getById(id), enabled: !!id });
}

export function useCreateCase() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: casesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: casesKeys.all }); } });
}

export function useUpdateCase() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Case> }) => casesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: casesKeys.all }); } });
}

export function useDeleteCase() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: casesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: casesKeys.all }); } });
}