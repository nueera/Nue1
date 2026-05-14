// @ts-nocheck
// Workflows Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowsService } from './service';
import { workflowsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Workflow } from './types';

export function useWorkflowsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: workflowsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => workflowsService.getAll(params) });
}

export function useWorkflow(id: string) {
  return useQuery({ queryKey: workflowsKeys.detail(id), queryFn: () => workflowsService.getById(id), enabled: !!id });
}

export function useCreateWorkflow() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: workflowsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: workflowsKeys.all }); } });
}

export function useUpdateWorkflow() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Workflow> }) => workflowsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: workflowsKeys.all }); } });
}

export function useDeleteWorkflow() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: workflowsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: workflowsKeys.all }); } });
}

