import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { smsService } from "./service";
import { smsKeys } from "./query-keys";

export function useSMSMessages(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: smsKeys.list(params || {}), queryFn: () => smsService.getAll(params) });
}

export function useSMSMessage(id: string) {
  return useQuery({ queryKey: smsKeys.detail(id), queryFn: () => smsService.getById(id), enabled: !!id });
}

export function useCreateSMSMessage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: smsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: smsKeys.all }); } });
}

export function useUpdateSMSMessage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<SMSMessage> }) => smsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: smsKeys.all }); } });
}

export function useDeleteSMSMessage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: smsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: smsKeys.all }); } });
}