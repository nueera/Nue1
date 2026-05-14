// @ts-nocheck
// CreditNotes Hooks — Zoho Invoice
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { creditNotesService } from './service';
import { creditNotesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { CreditNote } from './types';

export function useCreditNotesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: creditNotesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => creditNotesService.getAll(params) });
}

export function useCreditNote(id: string) {
  return useQuery({ queryKey: creditNotesKeys.detail(id), queryFn: () => creditNotesService.getById(id), enabled: !!id });
}

export function useCreateCreditNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: creditNotesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: creditNotesKeys.all }); } });
}

export function useUpdateCreditNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CreditNote> }) => creditNotesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: creditNotesKeys.all }); } });
}

export function useDeleteCreditNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: creditNotesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: creditNotesKeys.all }); } });
}

