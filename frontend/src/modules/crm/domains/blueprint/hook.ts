import type { Blueprint } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blueprintService } from "./service";
import { blueprintKeys } from "./query-keys";

export function useBlueprints(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: blueprintKeys.list(params || {}), queryFn: () => blueprintService.getAll(params) });
}

export function useBlueprint(id: string) {
  return useQuery({ queryKey: blueprintKeys.detail(id), queryFn: () => blueprintService.getById(id), enabled: !!id });
}

export function useCreateBlueprint() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: blueprintService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: blueprintKeys.all }); } });
}

export function useUpdateBlueprint() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Blueprint> }) => blueprintService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: blueprintKeys.all }); } });
}

export function useDeleteBlueprint() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: blueprintService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: blueprintKeys.all }); } });
}