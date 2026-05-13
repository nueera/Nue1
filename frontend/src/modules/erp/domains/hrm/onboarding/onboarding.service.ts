import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse } from '../../../core/types';
import type { OnboardingTemplate, NewHire, OnboardingTask } from '../types';
import type { CreateTemplateInput, CreateNewHireInput, UpdateTaskInput } from './onboarding.schema';

export const onboardingService = {
  getTemplates: () =>
    apiClient.get<ApiResponse<OnboardingTemplate[]>>('/onboarding/templates'),

  getNewHires: () =>
    apiClient.get<ApiResponse<NewHire[]>>('/onboarding/new-hires'),

  getDetail: (id: string) =>
    apiClient.get<ApiResponse<NewHire>>(`/onboarding/${id}`),

  createTemplate: (data: CreateTemplateInput) =>
    apiClient.post<ApiResponse<OnboardingTemplate>>('/onboarding/templates', data),

  createHire: (data: CreateNewHireInput) =>
    apiClient.post<ApiResponse<NewHire>>('/onboarding/new-hires', data),

  updateTask: (data: UpdateTaskInput) =>
    apiClient.patch<ApiResponse<OnboardingTask>>('/onboarding/tasks', data),
};
