// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardsService } from "./service";
import { dashboardsKeys } from "./query-keys";

export function useDashboards(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: dashboardsKeys.list(params || {}), queryFn: () => dashboardsService.getAll(params) });
}

export function useDashboard(id: string) {
  return useQuery({ queryKey: dashboardsKeys.detail(id), queryFn: () => dashboardsService.getById(id), enabled: !!id });
}

export function useCreateDashboard() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: dashboardsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: dashboardsKeys.all }); } });
}

export function useUpdateDashboard() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Dashboard> }) => dashboardsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: dashboardsKeys.all }); } });
}

export function useDeleteDashboard() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: dashboardsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: dashboardsKeys.all }); } });
}