// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { creditNoteService } from './service';
import { creditNoteKeys } from './query-keys';
import type { CreditNote } from './types';

export function useCreditNotes(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: creditNoteKeys.list(params || {}), queryFn: () => creditNoteService.getAll(params) });
}
export function useCreditNote(id: string) {
  return useQuery({ queryKey: creditNoteKeys.detail(id), queryFn: () => creditNoteService.getById(id), enabled: !!id });
}
export function useCreateCreditNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: creditNoteService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: creditNoteKeys.all }); } });
}
export function useUpdateCreditNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CreditNote> }) => creditNoteService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: creditNoteKeys.all }); } });
}
export function useDeleteCreditNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: creditNoteService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: creditNoteKeys.all }); } });
}
