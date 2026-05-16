import type { ClientScript } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientscriptsService } from "./service";
import { clientScriptsKeys } from "./query-keys";

export function useClientScripts(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: clientScriptsKeys.list(params || {}), queryFn: () => clientscriptsService.getAll(params) });
}

export function useClientScript(id: string) {
  return useQuery({ queryKey: clientScriptsKeys.detail(id), queryFn: () => clientscriptsService.getById(id), enabled: !!id });
}

export function useCreateClientScript() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: clientscriptsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: clientScriptsKeys.all }); } });
}

export function useUpdateClientScript() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<ClientScript> }) => clientscriptsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: clientScriptsKeys.all }); } });
}

export function useDeleteClientScript() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: clientscriptsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: clientScriptsKeys.all }); } });
}