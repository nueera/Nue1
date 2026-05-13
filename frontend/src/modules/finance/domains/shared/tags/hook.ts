// Tags Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagsService } from './service';
import { tagsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Tag } from './types';

export function useTagsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: tagsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => tagsService.getAll(params) });
}

export function useTag(id: string) {
  return useQuery({ queryKey: tagsKeys.detail(id), queryFn: () => tagsService.getById(id), enabled: !!id });
}

export function useCreateTag() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: tagsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: tagsKeys.all }); } });
}

export function useUpdateTag() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Tag> }) => tagsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: tagsKeys.all }); } });
}

export function useDeleteTag() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: tagsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: tagsKeys.all }); } });
}

