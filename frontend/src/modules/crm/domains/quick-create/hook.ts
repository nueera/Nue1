// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { quickcreateService } from "./service";
import { quickCreateKeys } from "./query-keys";

export function useQuickCreateConfigs(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: quickCreateKeys.list(params || {}), queryFn: () => quickcreateService.getAll(params) });
}

export function useQuickCreateConfig(id: string) {
  return useQuery({ queryKey: quickCreateKeys.detail(id), queryFn: () => quickcreateService.getById(id), enabled: !!id });
}

export function useCreateQuickCreateConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: quickcreateService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: quickCreateKeys.all }); } });
}

export function useUpdateQuickCreateConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<QuickCreateConfig> }) => quickcreateService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: quickCreateKeys.all }); } });
}

export function useDeleteQuickCreateConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: quickcreateService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: quickCreateKeys.all }); } });
}