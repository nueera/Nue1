import type { PipelineSnapshot } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pipelineanalyticsService } from "./service";
import { pipelineAnalyticsKeys } from "./query-keys";

export function usePipelineSnapshots(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: pipelineAnalyticsKeys.list(params || {}), queryFn: () => pipelineanalyticsService.getAll(params) });
}

export function usePipelineSnapshot(id: string) {
  return useQuery({ queryKey: pipelineAnalyticsKeys.detail(id), queryFn: () => pipelineanalyticsService.getById(id), enabled: !!id });
}

export function useCreatePipelineSnapshot() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: pipelineanalyticsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: pipelineAnalyticsKeys.all }); } });
}

export function useUpdatePipelineSnapshot() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<PipelineSnapshot> }) => pipelineanalyticsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: pipelineAnalyticsKeys.all }); } });
}

export function useDeletePipelineSnapshot() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: pipelineanalyticsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: pipelineAnalyticsKeys.all }); } });
}