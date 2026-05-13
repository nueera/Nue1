'use client';

// ============================================================================
// Campaign Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignService } from '../services/campaign.service';
import { campaignKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { CreateCampaignInput, ScheduleCampaignInput } from '../schemas/campaign.schema';

export function useCampaigns(params?: PaginatedRequest) {
  return useQuery({
    queryKey: campaignKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => campaignService.list(params),
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: campaignKeys.detail(id),
    queryFn: () => campaignService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCampaignInput) => campaignService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
}

export function useUpdateCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCampaignInput> }) =>
      campaignService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
}

export function useDeleteCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => campaignService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
}

export function useSendCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => campaignService.send(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
}

export function useScheduleCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ScheduleCampaignInput }) =>
      campaignService.schedule(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
}

export function useDuplicateCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => campaignService.duplicate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
}

export function useCampaignAnalytics(id: string) {
  return useQuery({
    queryKey: campaignKeys.analytics(id),
    queryFn: () => campaignService.getAnalytics(id),
    enabled: !!id,
  });
}
