// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "./service";
import { emailKeys } from "./query-keys";

export function useEmailMessages(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: emailKeys.list(params || {}), queryFn: () => emailService.getAll(params) });
}

export function useEmailMessage(id: string) {
  return useQuery({ queryKey: emailKeys.detail(id), queryFn: () => emailService.getById(id), enabled: !!id });
}

export function useCreateEmailMessage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: emailService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: emailKeys.all }); } });
}

export function useUpdateEmailMessage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<EmailMessage> }) => emailService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: emailKeys.all }); } });
}

export function useDeleteEmailMessage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: emailService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: emailKeys.all }); } });
}