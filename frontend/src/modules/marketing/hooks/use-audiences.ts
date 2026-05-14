// @ts-nocheck
'use client';

// ============================================================================
// Audience Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { audienceService, type CreateAudienceInput, type UpdateAudienceInput } from '../services/audience.service';
import { audienceKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';

export function useAudiences(params?: PaginatedRequest) {
  return useQuery({
    queryKey: audienceKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => audienceService.list(params),
  });
}

export function useAudience(id: string) {
  return useQuery({
    queryKey: audienceKeys.detail(id),
    queryFn: () => audienceService.getById(id),
    enabled: !!id,
  });
}

export function useCreateAudience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAudienceInput) => audienceService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: audienceKeys.all });
    },
  });
}

export function useUpdateAudience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAudienceInput }) =>
      audienceService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: audienceKeys.all });
    },
  });
}

export function useDeleteAudience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => audienceService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: audienceKeys.all });
    },
  });
}

export function useAudienceMembers(id: string) {
  return useQuery({
    queryKey: audienceKeys.members(id),
    queryFn: () => audienceService.getById(id),
    enabled: !!id,
    select: (response) => response.data,
  });
}

export function useAudienceGrowth(id: string) {
  return useQuery({
    queryKey: audienceKeys.growth(id),
    queryFn: () => audienceService.getGrowth(id),
    enabled: !!id,
  });
}
