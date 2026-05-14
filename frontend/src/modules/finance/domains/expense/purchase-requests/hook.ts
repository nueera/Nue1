// @ts-nocheck
// PurchaseRequests Hooks — Zoho Expense
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { purchaseRequestsService } from './service';
import { purchaseRequestsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { PurchaseRequest } from './types';

export function usePurchaseRequestsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: purchaseRequestsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => purchaseRequestsService.getAll(params) });
}

export function usePurchaseRequest(id: string) {
  return useQuery({ queryKey: purchaseRequestsKeys.detail(id), queryFn: () => purchaseRequestsService.getById(id), enabled: !!id });
}

export function useCreatePurchaseRequest() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: purchaseRequestsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseRequestsKeys.all }); } });
}

export function useUpdatePurchaseRequest() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<PurchaseRequest> }) => purchaseRequestsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: purchaseRequestsKeys.all }); } });
}

