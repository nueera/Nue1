'use client';

// ============================================================================
// Lead Scoring Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scoringService } from '../services/scoring.service';
import { scoringKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { ScoringRuleInput } from '../schemas/scoring.schema';

export function useScoringRules(params?: PaginatedRequest) {
  return useQuery({
    queryKey: scoringKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => scoringService.list(params),
  });
}

export function useScoringRule(id: string) {
  return useQuery({
    queryKey: scoringKeys.detail(id),
    queryFn: () => scoringService.getById(id),
    enabled: !!id,
  });
}

export function useCreateRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ScoringRuleInput) => scoringService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: scoringKeys.all });
    },
  });
}

export function useUpdateRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ScoringRuleInput> }) =>
      scoringService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: scoringKeys.all });
    },
  });
}

export function useDeleteRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => scoringService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: scoringKeys.all });
    },
  });
}

export function useRecalculateScores() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => scoringService.recalculateAll(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: scoringKeys.all });
      qc.invalidateQueries({ queryKey: ['marketing', 'leads'] });
    },
  });
}

export function useScoreLeaderboard(params?: PaginatedRequest) {
  return useQuery({
    queryKey: scoringKeys.leaderboard(),
    queryFn: () => scoringService.getLeaderboard(params),
  });
}
