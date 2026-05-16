import type { CPQConfig } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cpqService } from "./service";
import { cpqKeys } from "./query-keys";

export function useCPQConfigs(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: cpqKeys.list(params || {}), queryFn: () => cpqService.getAll(params) });
}

export function useCPQConfig(id: string) {
  return useQuery({ queryKey: cpqKeys.detail(id), queryFn: () => cpqService.getById(id), enabled: !!id });
}

export function useCreateCPQConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: cpqService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: cpqKeys.all }); } });
}

export function useUpdateCPQConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CPQConfig> }) => cpqService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: cpqKeys.all }); } });
}

export function useDeleteCPQConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: cpqService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: cpqKeys.all }); } });
}