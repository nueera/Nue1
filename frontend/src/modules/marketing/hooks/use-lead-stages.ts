'use client';

// ============================================================================
// Lead Stages Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stagesService, type CreateStageInput, type UpdateStageInput } from '../services/stages.service';
import { stageKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';

export function useStages(params?: PaginatedRequest) {
  return useQuery({
    queryKey: stageKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => stagesService.list(params),
  });
}

export function useStage(id: string) {
  return useQuery({
    queryKey: stageKeys.detail(id),
    queryFn: () => stagesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStageInput) => stagesService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: stageKeys.all });
    },
  });
}

export function useUpdateStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStageInput }) =>
      stagesService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: stageKeys.all });
    },
  });
}

export function useDeleteStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => stagesService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: stageKeys.all });
    },
  });
}

export function useStageDistribution() {
  return useQuery({
    queryKey: stageKeys.distribution(),
    queryFn: () => stagesService.getDistribution(),
  });
}
