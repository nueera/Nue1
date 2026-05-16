'use client';

// ============================================================================
// Signup Form Hooks — TanStack Query v5
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { signupFormService } from '../services/signup-form.service';
import { formKeys } from '../api/query-keys';
import type { PaginatedRequest } from '../types';
import type { CreateFormInput } from '../schemas/signup-form.schema';

export function useSignupForms(params?: PaginatedRequest) {
  return useQuery({
    queryKey: formKeys.list((params || {}) as Record<string, unknown>),
    queryFn: () => signupFormService.list(params),
  });
}

export function useSignupForm(id: string) {
  return useQuery({
    queryKey: formKeys.detail(id),
    queryFn: () => signupFormService.getById(id),
    enabled: !!id,
  });
}

export function useCreateForm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFormInput) => signupFormService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formKeys.all });
    },
  });
}

export function useUpdateForm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateFormInput> }) =>
      signupFormService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formKeys.all });
    },
  });
}

export function useDeleteForm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => signupFormService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formKeys.all });
    },
  });
}

export function useFormSubmissions(id: string, params?: PaginatedRequest) {
  return useQuery({
    queryKey: formKeys.submissions(id),
    queryFn: () => signupFormService.getSubmissions(id, params),
    enabled: !!id,
  });
}

export function usePublishForm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => signupFormService.publish(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formKeys.all });
    },
  });
}
