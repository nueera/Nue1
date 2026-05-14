// @ts-nocheck
'use client';

// ============================================================================
// Compliance Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { complianceService, type UpdateConsentInput, type HandleGdprRequestInput } from '../services/compliance.service';
import { complianceKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';

export function useConsents(params?: PaginatedRequest) {
  return useQuery({
    queryKey: complianceKeys.consentList((params || {}) as Record<string, unknown>),
    queryFn: () => complianceService.getConsents(params),
  });
}

export function useUpdateConsent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateConsentInput }) =>
      complianceService.updateConsent(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: complianceKeys.consents() });
    },
  });
}

export function useGdprRequests(params?: PaginatedRequest) {
  return useQuery({
    queryKey: complianceKeys.gdprRequestList((params || {}) as Record<string, unknown>),
    queryFn: () => complianceService.getGdprRequests(params),
  });
}

export function useHandleGdprRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: HandleGdprRequestInput }) =>
      complianceService.handleGdprRequest(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: complianceKeys.gdprRequests() });
    },
  });
}

export function useUnsubscribes(params?: PaginatedRequest) {
  return useQuery({
    queryKey: complianceKeys.unsubscribeList((params || {}) as Record<string, unknown>),
    queryFn: () => complianceService.getUnsubscribes(params),
  });
}
