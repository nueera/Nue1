import type { PageLayout } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pagelayoutsService } from "./service";
import { pageLayoutsKeys } from "./query-keys";

export function usePageLayouts(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: pageLayoutsKeys.list(params || {}), queryFn: () => pagelayoutsService.getAll(params) });
}

export function usePageLayout(id: string) {
  return useQuery({ queryKey: pageLayoutsKeys.detail(id), queryFn: () => pagelayoutsService.getById(id), enabled: !!id });
}

export function useCreatePageLayout() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: pagelayoutsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: pageLayoutsKeys.all }); } });
}

export function useUpdatePageLayout() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<PageLayout> }) => pagelayoutsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: pageLayoutsKeys.all }); } });
}

export function useDeletePageLayout() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: pagelayoutsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: pageLayoutsKeys.all }); } });
}