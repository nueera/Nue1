'use client';

// ============================================================================
// Landing Page Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landingPageService } from '../services/landing-page.service';
import { landingPageKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { CreatePageInput } from '../schemas/landing-page.schema';

export function useLandingPages(params?: PaginatedRequest) {
  return useQuery({
    queryKey: landingPageKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => landingPageService.list(params),
  });
}

export function useLandingPage(id: string) {
  return useQuery({
    queryKey: landingPageKeys.detail(id),
    queryFn: () => landingPageService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePageInput) => landingPageService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: landingPageKeys.all });
    },
  });
}

export function useUpdatePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePageInput> }) =>
      landingPageService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: landingPageKeys.all });
    },
  });
}

export function useDeletePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => landingPageService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: landingPageKeys.all });
    },
  });
}

export function usePublishPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => landingPageService.publish(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: landingPageKeys.all });
    },
  });
}

export function usePageAnalytics(id: string) {
  return useQuery({
    queryKey: landingPageKeys.analytics(id),
    queryFn: () => landingPageService.getAnalytics(id),
    enabled: !!id,
  });
}
