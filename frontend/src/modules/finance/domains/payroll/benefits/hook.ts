// Benefits Hooks — Zoho Payroll
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { benefitsService } from './service';
import { benefitsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Benefit } from './types';

export function useBenefitsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: benefitsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => benefitsService.getAll(params) });
}

export function useBenefit(id: string) {
  return useQuery({ queryKey: benefitsKeys.detail(id), queryFn: () => benefitsService.getById(id), enabled: !!id });
}

export function useCreateBenefit() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: benefitsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: benefitsKeys.all }); } });
}

export function useUpdateBenefit() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Benefit> }) => benefitsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: benefitsKeys.all }); } });
}

export function useDeleteBenefit() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: benefitsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: benefitsKeys.all }); } });
}

