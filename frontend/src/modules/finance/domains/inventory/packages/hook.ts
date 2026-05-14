// @ts-nocheck
// Packages Hooks — Zoho Inventory
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { packagesService } from './service';
import { packagesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Package } from './types';

export function usePackagesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: packagesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => packagesService.getAll(params) });
}

export function usePackage(id: string) {
  return useQuery({ queryKey: packagesKeys.detail(id), queryFn: () => packagesService.getById(id), enabled: !!id });
}

export function useCreatePackage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: packagesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: packagesKeys.all }); } });
}

export function useUpdatePackage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Package> }) => packagesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: packagesKeys.all }); } });
}

export function useDeletePackage() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: packagesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: packagesKeys.all }); } });
}

