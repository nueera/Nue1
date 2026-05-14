// @ts-nocheck
// ============================================================================
// Projects — Hooks
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from './service';
import { projectKeys } from './query-keys';
import type { Project } from './types';

export function useProjects(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: projectKeys.list(params || {}), queryFn: () => projectService.getAll(params) });
}

export function useProject(id: string) {
  return useQuery({ queryKey: projectKeys.detail(id), queryFn: () => projectService.getById(id), enabled: !!id });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: projectService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: projectKeys.all }); } });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => projectService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: projectKeys.all }); },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: projectService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: projectKeys.all }); } });
}

export function useProjectStats() {
  return useQuery({ queryKey: projectKeys.stats(), queryFn: () => projectService.getStats() });
}
