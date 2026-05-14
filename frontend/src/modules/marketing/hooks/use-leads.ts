// @ts-nocheck
'use client';

// ============================================================================
// Lead Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadService } from '../services/lead.service';
import { leadKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { CreateLeadInput, UpdateLeadInput, ImportLeadInput } from '../schemas/lead.schema';

export function useLeads(params?: PaginatedRequest) {
  return useQuery({
    queryKey: leadKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => leadService.list(params),
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: leadKeys.detail(id),
    queryFn: () => leadService.getById(id),
    enabled: !!id,
  });
}

export function useCreateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeadInput) => leadService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadKeys.all });
    },
  });
}

export function useUpdateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadInput }) =>
      leadService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadKeys.all });
    },
  });
}

export function useDeleteLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leadService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadKeys.all });
    },
  });
}

export function useConvertLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leadService.convertToContact(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadKeys.all });
    },
  });
}

export function useMergeLeads() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ primaryId, secondaryIds }: { primaryId: string; secondaryIds: string[] }) =>
      leadService.mergeLeads(primaryId, secondaryIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadKeys.all });
    },
  });
}

export function useImportLeads() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (leads: ImportLeadInput[]) => leadService.importLeads(leads),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: leadKeys.all });
    },
  });
}

export function useLeadTimeline(id: string) {
  return useQuery({
    queryKey: leadKeys.timeline(id),
    queryFn: () => leadService.getTimeline(id),
    enabled: !!id,
  });
}
