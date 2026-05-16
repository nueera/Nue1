// Notes Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesService } from './service';
import { notesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Note } from './types';

export function useNotesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: notesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => notesService.getAll(params) });
}

export function useNote(id: string) {
  return useQuery({ queryKey: notesKeys.detail(id), queryFn: () => notesService.getById(id), enabled: !!id });
}

export function useCreateNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: notesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: notesKeys.all }); } });
}

export function useUpdateNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Note> }) => notesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: notesKeys.all }); } });
}

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: notesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: notesKeys.all }); } });
}

