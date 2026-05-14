// @ts-nocheck
'use client';

// ============================================================================
// Web Tracking Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { webTrackingService, type CreateSmartUrlInput, type UpdateSmartUrlInput, type CreateGoalInput, type UpdateGoalInput } from '../services/web-tracking.service';
import { trackingKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';

// Smart URL hooks

export function useSmartUrls(params?: PaginatedRequest) {
  return useQuery({
    queryKey: trackingKeys.smartUrlList((params || {}) as Record<string, unknown>),
    queryFn: () => webTrackingService.listSmartUrls(params),
  });
}

export function useSmartUrl(id: string) {
  return useQuery({
    queryKey: trackingKeys.smartUrlDetail(id),
    queryFn: () => webTrackingService.getSmartUrl(id),
    enabled: !!id,
  });
}

export function useCreateSmartUrl() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSmartUrlInput) => webTrackingService.createSmartUrl(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: trackingKeys.smartUrls() });
    },
  });
}

// Goal hooks

export function useGoals(params?: PaginatedRequest) {
  return useQuery({
    queryKey: trackingKeys.goalList((params || {}) as Record<string, unknown>),
    queryFn: () => webTrackingService.listGoals(params),
  });
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: trackingKeys.goalDetail(id),
    queryFn: () => webTrackingService.getGoal(id),
    enabled: !!id,
  });
}

export function useCreateGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGoalInput) => webTrackingService.createGoal(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: trackingKeys.goals() });
    },
  });
}

// Conversions

export function useConversions(goalId: string, params?: PaginatedRequest) {
  return useQuery({
    queryKey: trackingKeys.goalConversions(goalId),
    queryFn: () => webTrackingService.getConversions(goalId, params),
    enabled: !!goalId,
  });
}
