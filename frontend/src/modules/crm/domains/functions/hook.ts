import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { functionsService } from "./service";
import { functionsKeys } from "./query-keys";

export function useDelugeFunctions(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: functionsKeys.list(params || {}), queryFn: () => functionsService.getAll(params) });
}

export function useDelugeFunction(id: string) {
  return useQuery({ queryKey: functionsKeys.detail(id), queryFn: () => functionsService.getById(id), enabled: !!id });
}

export function useCreateDelugeFunction() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: functionsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: functionsKeys.all }); } });
}

export function useUpdateDelugeFunction() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<DelugeFunction> }) => functionsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: functionsKeys.all }); } });
}

export function useDeleteDelugeFunction() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: functionsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: functionsKeys.all }); } });
}