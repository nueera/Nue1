// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { salesiqService } from "./service";
import { salesiqKeys } from "./query-keys";

export function useChatSessions(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: salesiqKeys.list(params || {}), queryFn: () => salesiqService.getAll(params) });
}

export function useChatSession(id: string) {
  return useQuery({ queryKey: salesiqKeys.detail(id), queryFn: () => salesiqService.getById(id), enabled: !!id });
}

export function useCreateChatSession() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesiqService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: salesiqKeys.all }); } });
}

export function useUpdateChatSession() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<ChatSession> }) => salesiqService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: salesiqKeys.all }); } });
}

export function useDeleteChatSession() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: salesiqService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: salesiqKeys.all }); } });
}