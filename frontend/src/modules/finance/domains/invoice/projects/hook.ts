// Projects Hooks — Zoho Invoice
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService } from './service';
import { projectsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Project } from './types';

export function useProjectsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: projectsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => projectsService.getAll(params) });
}

export function useProject(id: string) {
  return useQuery({ queryKey: projectsKeys.detail(id), queryFn: () => projectsService.getById(id), enabled: !!id });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: projectsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: projectsKeys.all }); } });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => projectsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: projectsKeys.all }); } });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: projectsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: projectsKeys.all }); } });
}

