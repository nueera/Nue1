import type { CRMSettings } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "./service";
import { settingsKeys } from "./query-keys";

export function useCRMSettingss(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: settingsKeys.list(params || {}), queryFn: () => settingsService.getAll(params) });
}

export function useCRMSettings(id: string) {
  return useQuery({ queryKey: settingsKeys.detail(id), queryFn: () => settingsService.getById(id), enabled: !!id });
}

export function useCreateCRMSettings() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: settingsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: settingsKeys.all }); } });
}

export function useUpdateCRMSettings() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CRMSettings> }) => settingsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: settingsKeys.all }); } });
}

export function useDeleteCRMSettings() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: settingsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: settingsKeys.all }); } });
}