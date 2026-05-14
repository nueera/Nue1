// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesprofilesService } from "./service";
import { rolesKeys } from "./query-keys";

export function useRoles(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: rolesKeys.list(params || {}), queryFn: () => rolesprofilesService.getAll(params) });
}

export function useRole(id: string) {
  return useQuery({ queryKey: rolesKeys.detail(id), queryFn: () => rolesprofilesService.getById(id), enabled: !!id });
}

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: rolesprofilesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: rolesKeys.all }); } });
}

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Role> }) => rolesprofilesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: rolesKeys.all }); } });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: rolesprofilesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: rolesKeys.all }); } });
}