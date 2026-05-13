import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { JobOpening, Candidate, Application, Referral, Interview } from '../types';

type ServiceParams = Record<string, string | number | boolean | undefined>;

export const recruitmentService = {
  // Job Openings
  getOpenings: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<JobOpening>>('/recruitment/openings', params),

  getOpening: (id: string) =>
    apiClient.get<ApiResponse<JobOpening>>(`/recruitment/openings/${id}`),

  createOpening: (data: Partial<JobOpening>) =>
    apiClient.post<ApiResponse<JobOpening>>('/recruitment/openings', data),

  updateOpening: (id: string, data: Partial<JobOpening>) =>
    apiClient.put<ApiResponse<JobOpening>>(`/recruitment/openings/${id}`, data),

  closeOpening: (id: string) =>
    apiClient.patch<ApiResponse<JobOpening>>(`/recruitment/openings/${id}/close`),

  // Candidates
  getCandidates: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<Candidate>>('/recruitment/candidates', params),

  getCandidate: (id: string) =>
    apiClient.get<ApiResponse<Candidate>>(`/recruitment/candidates/${id}`),

  // Applications
  getApplications: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<Application>>('/recruitment/applications', params),

  getApplication: (id: string) =>
    apiClient.get<ApiResponse<Application>>(`/recruitment/applications/${id}`),

  updateApplicationStage: (id: string, stage: string) =>
    apiClient.patch<ApiResponse<Application>>(`/recruitment/applications/${id}/stage`, { stage }),

  rejectApplication: (id: string, reason: string) =>
    apiClient.patch<ApiResponse<Application>>(`/recruitment/applications/${id}/reject`, { reason }),

  // Referrals
  getReferrals: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<Referral>>('/recruitment/referrals', params),

  referCandidate: (data: Partial<Referral>) =>
    apiClient.post<ApiResponse<Referral>>('/recruitment/referrals', data),

  // Interviews
  getInterviews: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<Interview>>('/recruitment/interviews', params),

  scheduleInterview: (data: Partial<Interview>) =>
    apiClient.post<ApiResponse<Interview>>('/recruitment/interviews', data),

  rescheduleInterview: (id: string, data: Partial<Interview>) =>
    apiClient.patch<ApiResponse<Interview>>(`/recruitment/interviews/${id}/reschedule`, data),

  cancelInterview: (id: string) =>
    apiClient.patch<ApiResponse<Interview>>(`/recruitment/interviews/${id}/cancel`),
};
