import type { CustomModule } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { custommodulesService } from "./service";
import { customModulesKeys } from "./query-keys";

export function useCustomModules(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: customModulesKeys.list(params || {}), queryFn: () => custommodulesService.getAll(params) });
}

export function useCustomModule(id: string) {
  return useQuery({ queryKey: customModulesKeys.detail(id), queryFn: () => custommodulesService.getById(id), enabled: !!id });
}

export function useCreateCustomModule() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: custommodulesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: customModulesKeys.all }); } });
}

export function useUpdateCustomModule() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CustomModule> }) => custommodulesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: customModulesKeys.all }); } });
}

export function useDeleteCustomModule() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: custommodulesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: customModulesKeys.all }); } });
}