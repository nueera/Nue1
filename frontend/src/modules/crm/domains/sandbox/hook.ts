// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sandboxService } from "./service";
import { sandboxKeys } from "./query-keys";

export function useSandboxs(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: sandboxKeys.list(params || {}), queryFn: () => sandboxService.getAll(params) });
}

export function useSandbox(id: string) {
  return useQuery({ queryKey: sandboxKeys.detail(id), queryFn: () => sandboxService.getById(id), enabled: !!id });
}

export function useCreateSandbox() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: sandboxService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: sandboxKeys.all }); } });
}

export function useUpdateSandbox() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Sandbox> }) => sandboxService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: sandboxKeys.all }); } });
}

export function useDeleteSandbox() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: sandboxService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: sandboxKeys.all }); } });
}