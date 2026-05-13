// CustomFields Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customFieldsService } from './service';
import { customFieldsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { CustomField } from './types';

export function useCustomFieldsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: customFieldsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => customFieldsService.getAll(params) });
}

export function useCustomField(id: string) {
  return useQuery({ queryKey: customFieldsKeys.detail(id), queryFn: () => customFieldsService.getById(id), enabled: !!id });
}

export function useCreateCustomField() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: customFieldsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: customFieldsKeys.all }); } });
}

export function useUpdateCustomField() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CustomField> }) => customFieldsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: customFieldsKeys.all }); } });
}

export function useDeleteCustomField() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: customFieldsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: customFieldsKeys.all }); } });
}

