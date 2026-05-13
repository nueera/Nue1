// Templates Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { templatesService } from './service';
import { templatesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Template } from './types';

export function useTemplatesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: templatesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => templatesService.getAll(params) });
}

export function useTemplate(id: string) {
  return useQuery({ queryKey: templatesKeys.detail(id), queryFn: () => templatesService.getById(id), enabled: !!id });
}

export function useCreateTemplate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: templatesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: templatesKeys.all }); } });
}

export function useUpdateTemplate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Template> }) => templatesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: templatesKeys.all }); } });
}

export function useDeleteTemplate() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: templatesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: templatesKeys.all }); } });
}

