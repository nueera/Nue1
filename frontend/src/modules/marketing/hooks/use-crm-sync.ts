// @ts-nocheck
'use client';

// ============================================================================
// CRM Sync Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { crmSyncService, type UpdateCrmSyncConfigInput } from '../services/crm-sync.service';
import { crmSyncKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';

export function useCrmSyncConfig() {
  return useQuery({
    queryKey: crmSyncKeys.config(),
    queryFn: () => crmSyncService.getConfig(),
  });
}

export function useUpdateCrmSyncConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCrmSyncConfigInput) => crmSyncService.updateConfig(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: crmSyncKeys.all });
    },
  });
}

export function useFieldMappings() {
  return useQuery({
    queryKey: crmSyncKeys.fieldMappings(),
    queryFn: () => crmSyncService.getFieldMappings(),
  });
}

export function useSyncNow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => crmSyncService.syncNow(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: crmSyncKeys.all });
    },
  });
}

export function useSyncLogs(params?: PaginatedRequest) {
  return useQuery({
    queryKey: crmSyncKeys.logs((params || {}) as Record<string, unknown>),
    queryFn: () => crmSyncService.getLogs(params),
  });
}
