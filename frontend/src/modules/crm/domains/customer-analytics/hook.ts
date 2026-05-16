import type { CustomerSegment } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customeranalyticsService } from "./service";
import { customerAnalyticsKeys } from "./query-keys";

export function useCustomerSegments(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: customerAnalyticsKeys.list(params || {}), queryFn: () => customeranalyticsService.getAll(params) });
}

export function useCustomerSegment(id: string) {
  return useQuery({ queryKey: customerAnalyticsKeys.detail(id), queryFn: () => customeranalyticsService.getById(id), enabled: !!id });
}

export function useCreateCustomerSegment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: customeranalyticsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: customerAnalyticsKeys.all }); } });
}

export function useUpdateCustomerSegment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CustomerSegment> }) => customeranalyticsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: customerAnalyticsKeys.all }); } });
}

export function useDeleteCustomerSegment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: customeranalyticsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: customerAnalyticsKeys.all }); } });
}