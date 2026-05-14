// @ts-nocheck
// Comments Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsService } from './service';
import { commentsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Comment } from './types';

export function useCommentsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: commentsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => commentsService.getAll(params) });
}

export function useComment(id: string) {
  return useQuery({ queryKey: commentsKeys.detail(id), queryFn: () => commentsService.getById(id), enabled: !!id });
}

export function useCreateComment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: commentsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: commentsKeys.all }); } });
}

export function useUpdateComment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Comment> }) => commentsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: commentsKeys.all }); } });
}

export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: commentsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: commentsKeys.all }); } });
}

