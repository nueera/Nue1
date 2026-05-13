import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invoicesService } from "./service";
import { invoicesKeys } from "./query-keys";

export function useInvoices(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: invoicesKeys.list(params || {}), queryFn: () => invoicesService.getAll(params) });
}

export function useInvoice(id: string) {
  return useQuery({ queryKey: invoicesKeys.detail(id), queryFn: () => invoicesService.getById(id), enabled: !!id });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: invoicesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); } });
}

export function useUpdateInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Invoice> }) => invoicesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); } });
}

export function useDeleteInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: invoicesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: invoicesKeys.all }); } });
}