// @ts-nocheck
// Subscriptions Hooks — Zoho Billing
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionsService } from './service';
import { subscriptionsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Subscription } from './types';

export function useSubscriptionsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: subscriptionsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => subscriptionsService.getAll(params) });
}

export function useSubscription(id: string) {
  return useQuery({ queryKey: subscriptionsKeys.detail(id), queryFn: () => subscriptionsService.getById(id), enabled: !!id });
}

export function useCreateSubscription() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: subscriptionsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: subscriptionsKeys.all }); } });
}

export function useUpdateSubscription() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Subscription> }) => subscriptionsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: subscriptionsKeys.all }); } });
}

export function useDeleteSubscription() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: subscriptionsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: subscriptionsKeys.all }); } });
}

