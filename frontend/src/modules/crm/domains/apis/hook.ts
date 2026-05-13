import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apisService } from "./service";
import { apisKeys } from "./query-keys";

export function useAPIEndpoints(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: apisKeys.list(params || {}), queryFn: () => apisService.getAll(params) });
}

export function useAPIEndpoint(id: string) {
  return useQuery({ queryKey: apisKeys.detail(id), queryFn: () => apisService.getById(id), enabled: !!id });
}

export function useCreateAPIEndpoint() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: apisService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: apisKeys.all }); } });
}

export function useUpdateAPIEndpoint() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<APIEndpoint> }) => apisService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: apisKeys.all }); } });
}

export function useDeleteAPIEndpoint() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: apisService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: apisKeys.all }); } });
}