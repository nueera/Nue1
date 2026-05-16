import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { activitiesService } from "./service";
import { activitiesKeys } from "./query-keys";
import type { Activity } from "./types";

export function useActivitys(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: activitiesKeys.list(params || {}), queryFn: () => activitiesService.getAll(params) });
}

export function useActivity(id: string) {
  return useQuery({ queryKey: activitiesKeys.detail(id), queryFn: () => activitiesService.getById(id), enabled: !!id });
}

export function useCreateActivity() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: activitiesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: activitiesKeys.all }); } });
}

export function useUpdateActivity() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Activity> }) => activitiesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: activitiesKeys.all }); } });
}

export function useDeleteActivity() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: activitiesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: activitiesKeys.all }); } });
}