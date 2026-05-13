// Plans Hooks — Zoho Billing
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { plansService } from './service';
import { plansKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Plan } from './types';

export function usePlansList(params?: PaginatedRequest) {
  return useQuery({ queryKey: plansKeys.list((params || {}) as Record<string, unknown>), queryFn: () => plansService.getAll(params) });
}

export function usePlan(id: string) {
  return useQuery({ queryKey: plansKeys.detail(id), queryFn: () => plansService.getById(id), enabled: !!id });
}

export function useCreatePlan() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: plansService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: plansKeys.all }); } });
}

export function useUpdatePlan() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Plan> }) => plansService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: plansKeys.all }); } });
}

export function useDeletePlan() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: plansService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: plansKeys.all }); } });
}

