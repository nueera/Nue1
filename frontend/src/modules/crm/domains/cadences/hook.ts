import type { Cadence } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cadencesService } from "./service";
import { cadencesKeys } from "./query-keys";

export function useCadences(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: cadencesKeys.list(params || {}), queryFn: () => cadencesService.getAll(params) });
}

export function useCadence(id: string) {
  return useQuery({ queryKey: cadencesKeys.detail(id), queryFn: () => cadencesService.getById(id), enabled: !!id });
}

export function useCreateCadence() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: cadencesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: cadencesKeys.all }); } });
}

export function useUpdateCadence() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Cadence> }) => cadencesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: cadencesKeys.all }); } });
}

export function useDeleteCadence() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: cadencesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: cadencesKeys.all }); } });
}