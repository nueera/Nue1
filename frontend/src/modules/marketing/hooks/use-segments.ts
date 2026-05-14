// @ts-nocheck
'use client';

// ============================================================================
// Segment Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { segmentService, type CreateSegmentInput, type UpdateSegmentInput } from '../services/segment.service';
import { segmentKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';

export function useSegments(params?: PaginatedRequest) {
  return useQuery({
    queryKey: segmentKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => segmentService.list(params),
  });
}

export function useSegment(id: string) {
  return useQuery({
    queryKey: segmentKeys.detail(id),
    queryFn: () => segmentService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSegment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSegmentInput) => segmentService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: segmentKeys.all });
    },
  });
}

export function useUpdateSegment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSegmentInput }) =>
      segmentService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: segmentKeys.all });
    },
  });
}

export function useDeleteSegment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => segmentService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: segmentKeys.all });
    },
  });
}

export function useSegmentPreview(id: string) {
  return useQuery({
    queryKey: segmentKeys.preview(id),
    queryFn: () => segmentService.previewCount(id),
    enabled: !!id,
  });
}
