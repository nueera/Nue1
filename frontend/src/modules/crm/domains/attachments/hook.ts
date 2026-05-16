import type { Attachment } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attachmentsService } from "./service";
import { attachmentsKeys } from "./query-keys";

export function useAttachments(params?: Record<string, string | number | boolean | undefined>) {
  // @ts-expect-error — Argument of type 'Record<string, string | number | boolean |...
  return useQuery({ queryKey: attachmentsKeys.list(params || {}), queryFn: () => attachmentsService.getAll(params) });
}

export function useAttachment(id: string) {
  return useQuery({ queryKey: attachmentsKeys.detail(id), queryFn: () => attachmentsService.getById(id), enabled: !!id });
}

export function useCreateAttachment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: attachmentsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: attachmentsKeys.all }); } });
}

export function useUpdateAttachment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Attachment> }) => attachmentsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: attachmentsKeys.all }); } });
}

export function useDeleteAttachment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: attachmentsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: attachmentsKeys.all }); } });
}