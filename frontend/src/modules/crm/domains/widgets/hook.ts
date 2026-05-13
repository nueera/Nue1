import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { widgetsService } from "./service";
import { widgetsKeys } from "./query-keys";

export function useWidgets(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: widgetsKeys.list(params || {}), queryFn: () => widgetsService.getAll(params) });
}

export function useWidget(id: string) {
  return useQuery({ queryKey: widgetsKeys.detail(id), queryFn: () => widgetsService.getById(id), enabled: !!id });
}

export function useCreateWidget() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: widgetsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: widgetsKeys.all }); } });
}

export function useUpdateWidget() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Widget> }) => widgetsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: widgetsKeys.all }); } });
}

export function useDeleteWidget() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: widgetsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: widgetsKeys.all }); } });
}