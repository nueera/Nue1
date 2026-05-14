// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { portalsService } from "./service";
import { portalsKeys } from "./query-keys";

export function usePortals(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: portalsKeys.list(params || {}), queryFn: () => portalsService.getAll(params) });
}

export function usePortal(id: string) {
  return useQuery({ queryKey: portalsKeys.detail(id), queryFn: () => portalsService.getById(id), enabled: !!id });
}

export function useCreatePortal() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: portalsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: portalsKeys.all }); } });
}

export function useUpdatePortal() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Portal> }) => portalsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: portalsKeys.all }); } });
}

export function useDeletePortal() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: portalsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: portalsKeys.all }); } });
}