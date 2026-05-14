// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { journeyorchestrationService } from "./service";
import { journeyKeys } from "./query-keys";

export function useJourneys(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: journeyKeys.list(params || {}), queryFn: () => journeyorchestrationService.getAll(params) });
}

export function useJourney(id: string) {
  return useQuery({ queryKey: journeyKeys.detail(id), queryFn: () => journeyorchestrationService.getById(id), enabled: !!id });
}

export function useCreateJourney() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: journeyorchestrationService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: journeyKeys.all }); } });
}

export function useUpdateJourney() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Journey> }) => journeyorchestrationService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: journeyKeys.all }); } });
}

export function useDeleteJourney() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: journeyorchestrationService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: journeyKeys.all }); } });
}