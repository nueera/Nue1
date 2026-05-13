'use client';

// ============================================================================
// Planner Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { plannerService } from '../services/planner.service';
import { planKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { CreatePlanInput, PlanActivityInput } from '../schemas/planner.schema';

export function usePlans(params?: PaginatedRequest) {
  return useQuery({
    queryKey: planKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => plannerService.list(params),
  });
}

export function usePlan(id: string) {
  return useQuery({
    queryKey: planKeys.detail(id),
    queryFn: () => plannerService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePlanInput) => plannerService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: planKeys.all });
    },
  });
}

export function useUpdatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePlanInput> }) =>
      plannerService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: planKeys.all });
    },
  });
}

export function useDeletePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => plannerService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: planKeys.all });
    },
  });
}

export function usePlanActivities(planId: string) {
  return useMutation({
    mutationFn: (activity: PlanActivityInput) => plannerService.addActivity(planId, activity),
  });
}

export function usePlanBudget(planId: string) {
  return useMutation({
    mutationFn: (budget: { allocated: number; currency?: string }) =>
      plannerService.updateBudget(planId, budget),
  });
}

export function usePlanROI(planId: string) {
  return useQuery({
    queryKey: planKeys.roi(planId),
    queryFn: () => plannerService.getROI(planId),
    enabled: !!planId,
  });
}
