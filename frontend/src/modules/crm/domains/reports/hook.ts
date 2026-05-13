import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportsService } from "./service";
import { reportsKeys } from "./query-keys";

export function useReports(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: reportsKeys.list(params || {}), queryFn: () => reportsService.getAll(params) });
}

export function useReport(id: string) {
  return useQuery({ queryKey: reportsKeys.detail(id), queryFn: () => reportsService.getById(id), enabled: !!id });
}

export function useCreateReport() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: reportsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: reportsKeys.all }); } });
}

export function useUpdateReport() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Report> }) => reportsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: reportsKeys.all }); } });
}

export function useDeleteReport() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: reportsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: reportsKeys.all }); } });
}