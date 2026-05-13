import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { onboardingService } from './onboarding.service';
import { onboardingKeys } from './query-keys';

import type { CreateTemplateInput, CreateNewHireInput, UpdateTaskInput } from './onboarding.schema';

export function useTemplates() {
  return useQuery({
    queryKey: onboardingKeys.templates(),
    queryFn: () => onboardingService.getTemplates(),
  });
}

export function useNewHires() {
  return useQuery({
    queryKey: onboardingKeys.newHires(),
    queryFn: () => onboardingService.getNewHires(),
  });
}

export function useHireDetail(id: string) {
  return useQuery({
    queryKey: onboardingKeys.detail(id),
    queryFn: () => onboardingService.getDetail(id),
    enabled: !!id,
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTemplateInput) => onboardingService.createTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.all });
    },
  });
}

export function useCreateHire() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateNewHireInput) => onboardingService.createHire(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.all });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTaskInput) => onboardingService.updateTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.all });
    },
  });
}
