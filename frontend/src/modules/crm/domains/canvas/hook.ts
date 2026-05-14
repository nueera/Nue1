// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { canvasService } from "./service";
import { canvasKeys } from "./query-keys";

export function useCanvasTemplates(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: canvasKeys.list(params || {}), queryFn: () => canvasService.getAll(params) });
}

export function useCanvasTemplate(id: string) {
  return useQuery({ queryKey: canvasKeys.detail(id), queryFn: () => canvasService.getById(id), enabled: !!id });
}

export function useCreateCanvasTemplate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: canvasService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: canvasKeys.all }); } });
}

export function useUpdateCanvasTemplate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CanvasTemplate> }) => canvasService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: canvasKeys.all }); } });
}

export function useDeleteCanvasTemplate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: canvasService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: canvasKeys.all }); } });
}