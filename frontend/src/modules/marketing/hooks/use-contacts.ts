'use client';

// ============================================================================
// Contact Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../services/contact.service';
import { contactKeys } from '../api/query-keys';
import type { PaginatedRequest, ContactPreference } from '../types';
import type { CreateContactInput, UpdateContactInput } from '../schemas/contact.schema';

export function useContacts(params?: PaginatedRequest) {
  return useQuery({
    queryKey: contactKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => contactService.list(params),
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: () => contactService.getById(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateContactInput) => contactService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}

export function useUpdateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactInput }) =>
      contactService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => contactService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}

export function useContactPreferences(id: string) {
  return useQuery({
    queryKey: contactKeys.preferences(id),
    queryFn: async () => {
      const result = await contactService.getById(id);
      return result.data.preferences;
    },
    enabled: !!id,
  });
}

export function useContactTimeline(id: string) {
  return useQuery({
    queryKey: contactKeys.timeline(id),
    queryFn: () => contactService.getTimeline(id),
    enabled: !!id,
  });
}

export function useImportContacts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (contacts: CreateContactInput[]) => contactService.importContacts(contacts),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}
