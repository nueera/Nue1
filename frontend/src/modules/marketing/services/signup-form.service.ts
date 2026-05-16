// ============================================================================
// Signup Form Service — CRUD + list, getSubmissions, publish, unpublish
// ============================================================================

import { marketingApi } from '../api/client';
import { AUDIENCES_ENDPOINTS } from '../api/endpoints';
import type { SignupForm, FormSubmission, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { CreateFormInput } from '../schemas/signup-form.schema';

export const signupFormService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<SignupForm>> => {
    return marketingApi.getPaginated<SignupForm>(AUDIENCES_ENDPOINTS.formList, params);
  },

  getById: async (id: string): Promise<ApiResponse<SignupForm>> => {
    return marketingApi.get<SignupForm>(AUDIENCES_ENDPOINTS.formDetail(id));
  },

  create: async (data: CreateFormInput): Promise<ApiResponse<SignupForm>> => {
    return marketingApi.post<SignupForm>(AUDIENCES_ENDPOINTS.formList, data);
  },

  update: async (id: string, data: Partial<CreateFormInput>): Promise<ApiResponse<SignupForm>> => {
    return marketingApi.patch<SignupForm>(AUDIENCES_ENDPOINTS.formDetail(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(AUDIENCES_ENDPOINTS.formDetail(id));
  },

  getSubmissions: async (id: string, params?: PaginatedRequest): Promise<PaginatedResponse<FormSubmission>> => {
    return marketingApi.getPaginated<FormSubmission>(AUDIENCES_ENDPOINTS.formSubmissions(id), params);
  },

  publish: async (id: string): Promise<ApiResponse<SignupForm>> => {
    return marketingApi.post<SignupForm>(`${AUDIENCES_ENDPOINTS.formDetail(id)}/publish`);
  },

  unpublish: async (id: string): Promise<ApiResponse<SignupForm>> => {
    return marketingApi.post<SignupForm>(`${AUDIENCES_ENDPOINTS.formDetail(id)}/unpublish`);
  },
};
