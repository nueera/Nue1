// @ts-nocheck
'use client';

// ============================================================================
// Journey Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { journeyService } from '../services/journey.service';
import { journeyKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { JourneyConfigInput } from '../schemas/journey.schema';

export function useJourneys(params?: PaginatedRequest) {
  return useQuery({
    queryKey: journeyKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => journeyService.list(params),
  });
}

export function useJourney(id: string) {
  return useQuery({
    queryKey: journeyKeys.detail(id),
    queryFn: () => journeyService.getById(id),
    enabled: !!id,
  });
}

export function useCreateJourney() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: JourneyConfigInput) => journeyService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: journeyKeys.all });
    },
  });
}

export function useUpdateJourney() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<JourneyConfigInput> }) =>
      journeyService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: journeyKeys.all });
    },
  });
}

export function useDeleteJourney() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => journeyService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: journeyKeys.all });
    },
  });
}

export function useActivateJourney() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => journeyService.activate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: journeyKeys.all });
    },
  });
}

export function usePauseJourney() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => journeyService.pause(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: journeyKeys.all });
    },
  });
}

export function useJourneyAnalytics(id: string) {
  return useQuery({
    queryKey: journeyKeys.analytics(id),
    queryFn: () => journeyService.getAnalytics(id),
    enabled: !!id,
  });
}
