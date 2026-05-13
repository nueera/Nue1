import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { territoriesService } from "./service";
import { territoriesKeys } from "./query-keys";

export function useTerritorys(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: territoriesKeys.list(params || {}), queryFn: () => territoriesService.getAll(params) });
}

export function useTerritory(id: string) {
  return useQuery({ queryKey: territoriesKeys.detail(id), queryFn: () => territoriesService.getById(id), enabled: !!id });
}

export function useCreateTerritory() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: territoriesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: territoriesKeys.all }); } });
}

export function useUpdateTerritory() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Territory> }) => territoriesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: territoriesKeys.all }); } });
}

export function useDeleteTerritory() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: territoriesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: territoriesKeys.all }); } });
}