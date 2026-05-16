import type { Vendor } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorsService } from "./service";
import { vendorsKeys } from "./query-keys";

export function useVendors(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: vendorsKeys.list(params || {}), queryFn: () => vendorsService.getAll(params) });
}

export function useVendor(id: string) {
  return useQuery({ queryKey: vendorsKeys.detail(id), queryFn: () => vendorsService.getById(id), enabled: !!id });
}

export function useCreateVendor() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: vendorsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: vendorsKeys.all }); } });
}

export function useUpdateVendor() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Vendor> }) => vendorsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: vendorsKeys.all }); } });
}

export function useDeleteVendor() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: vendorsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: vendorsKeys.all }); } });
}