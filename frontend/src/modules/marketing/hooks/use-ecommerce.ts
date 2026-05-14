// @ts-nocheck
'use client';

// ============================================================================
// E-Commerce Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ecommerceService } from '../services/ecommerce.service';
import { ecommerceKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { StoreConnectInput, CartRecoveryInput } from '../schemas/ecommerce.schema';

export function useStores(params?: PaginatedRequest) {
  return useQuery({
    queryKey: ecommerceKeys.storeList((params || {}) as Record<string, unknown>),
    queryFn: () => ecommerceService.getStores(params),
  });
}

export function useStore(id: string) {
  return useQuery({
    queryKey: ecommerceKeys.storeDetail(id),
    queryFn: () => ecommerceService.getStore(id),
    enabled: !!id,
  });
}

export function useConnectStore() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: StoreConnectInput) => ecommerceService.connectStore(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ecommerceKeys.stores() });
    },
  });
}

export function useAbandonedCarts(params?: PaginatedRequest) {
  return useQuery({
    queryKey: ecommerceKeys.cartList((params || {}) as Record<string, unknown>),
    queryFn: () => ecommerceService.getCarts(params),
  });
}

export function usePurchaseFollowups(params?: PaginatedRequest) {
  return useQuery({
    queryKey: ecommerceKeys.followupList((params || {}) as Record<string, unknown>),
    queryFn: () => ecommerceService.getFollowups(params),
  });
}

export function useProductCampaigns(params?: PaginatedRequest) {
  return useQuery({
    queryKey: ecommerceKeys.productCampaignList((params || {}) as Record<string, unknown>),
    queryFn: () => ecommerceService.getProductCampaigns(params),
  });
}
