// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { importService } from "./service";
import { importKeys } from "./query-keys";

export function useImportJobs(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: importKeys.list(params || {}), queryFn: () => importService.getAll(params) });
}

export function useImportJob(id: string) {
  return useQuery({ queryKey: importKeys.detail(id), queryFn: () => importService.getById(id), enabled: !!id });
}

export function useCreateImportJob() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: importService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: importKeys.all }); } });
}

export function useUpdateImportJob() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<ImportJob> }) => importService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: importKeys.all }); } });
}

export function useDeleteImportJob() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: importService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: importKeys.all }); } });
}