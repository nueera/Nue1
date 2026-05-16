'use client';

// ============================================================================
// Popup Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { popupService } from '../services/popup.service';
import { popupKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { CreatePopupInput } from '../schemas/popup.schema';

export function usePopups(params?: PaginatedRequest) {
  return useQuery({
    queryKey: popupKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => popupService.list(params),
  });
}

export function usePopup(id: string) {
  return useQuery({
    queryKey: popupKeys.detail(id),
    queryFn: () => popupService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePopup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePopupInput) => popupService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: popupKeys.all });
    },
  });
}

export function useUpdatePopup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePopupInput> }) =>
      popupService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: popupKeys.all });
    },
  });
}

export function useDeletePopup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => popupService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: popupKeys.all });
    },
  });
}

export function usePopupAnalytics(id: string) {
  return useQuery({
    queryKey: popupKeys.analytics(id),
    queryFn: () => popupService.getAnalytics(id),
    enabled: !!id,
  });
}
