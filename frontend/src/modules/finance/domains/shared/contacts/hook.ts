// Contacts Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsService } from './service';
import { contactsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Contact } from './types';

export function useContactsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: contactsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => contactsService.getAll(params) });
}

export function useContact(id: string) {
  return useQuery({ queryKey: contactsKeys.detail(id), queryFn: () => contactsService.getById(id), enabled: !!id });
}

export function useCreateContact() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: contactsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: contactsKeys.all }); } });
}

export function useUpdateContact() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Contact> }) => contactsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: contactsKeys.all }); } });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: contactsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: contactsKeys.all }); } });
}

