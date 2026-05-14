// @ts-nocheck
// Trips Hooks — Zoho Expense
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripsService } from './service';
import { tripsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Trip } from './types';

export function useTripsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: tripsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => tripsService.getAll(params) });
}

export function useTrip(id: string) {
  return useQuery({ queryKey: tripsKeys.detail(id), queryFn: () => tripsService.getById(id), enabled: !!id });
}

export function useCreateTrip() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: tripsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: tripsKeys.all }); } });
}

export function useUpdateTrip() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Trip> }) => tripsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: tripsKeys.all }); } });
}

export function useDeleteTrip() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: tripsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: tripsKeys.all }); } });
}

