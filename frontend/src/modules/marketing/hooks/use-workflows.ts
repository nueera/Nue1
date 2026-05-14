// @ts-nocheck
'use client';

// ============================================================================
// Workflow Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowService, type CreateWorkflowInput, type UpdateWorkflowInput } from '../services/workflow.service';
import { workflowKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';

export function useWorkflows(params?: PaginatedRequest) {
  return useQuery({
    queryKey: workflowKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => workflowService.list(params),
  });
}

export function useWorkflow(id: string) {
  return useQuery({
    queryKey: workflowKeys.detail(id),
    queryFn: () => workflowService.getById(id),
    enabled: !!id,
  });
}

export function useCreateWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWorkflowInput) => workflowService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workflowKeys.all });
    },
  });
}

export function useUpdateWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkflowInput }) =>
      workflowService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workflowKeys.all });
    },
  });
}

export function useDeleteWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workflowService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workflowKeys.all });
    },
  });
}

export function useActivateWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workflowService.activate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workflowKeys.all });
    },
  });
}

export function useWorkflowLogs(id: string, params?: PaginatedRequest) {
  return useQuery({
    queryKey: workflowKeys.logs(id),
    queryFn: () => workflowService.getLogs(id, params),
    enabled: !!id,
  });
}
