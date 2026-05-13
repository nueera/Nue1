import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { forecastingService } from "./service";
import { forecastingKeys } from "./query-keys";

export function useForecastPeriods(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: forecastingKeys.list(params || {}), queryFn: () => forecastingService.getAll(params) });
}

export function useForecastPeriod(id: string) {
  return useQuery({ queryKey: forecastingKeys.detail(id), queryFn: () => forecastingService.getById(id), enabled: !!id });
}

export function useCreateForecastPeriod() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: forecastingService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: forecastingKeys.all }); } });
}

export function useUpdateForecastPeriod() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<ForecastPeriod> }) => forecastingService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: forecastingKeys.all }); } });
}

export function useDeleteForecastPeriod() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: forecastingService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: forecastingKeys.all }); } });
}