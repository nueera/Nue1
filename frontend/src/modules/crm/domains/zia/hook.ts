// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ziaService } from "./service";
import { ziaKeys } from "./query-keys";

export function useZiaConfigs(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: ziaKeys.list(params || {}), queryFn: () => ziaService.getAll(params) });
}

export function useZiaConfig(id: string) {
  return useQuery({ queryKey: ziaKeys.detail(id), queryFn: () => ziaService.getById(id), enabled: !!id });
}

export function useCreateZiaConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ziaService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: ziaKeys.all }); } });
}

export function useUpdateZiaConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<ZiaConfig> }) => ziaService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ziaKeys.all }); } });
}

export function useDeleteZiaConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ziaService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: ziaKeys.all }); } });
}