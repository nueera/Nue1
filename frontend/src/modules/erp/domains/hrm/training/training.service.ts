import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { TrainingProgram, TrainingSession, Enrollment, TrainingFeedback, Certificate } from '../types';

type ServiceParams = Record<string, string | number | boolean | undefined>;

export const trainingService = {
  // Programs
  getPrograms: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<TrainingProgram>>('/training/programs', params),

  getProgram: (id: string) =>
    apiClient.get<ApiResponse<TrainingProgram>>(`/training/programs/${id}`),

  createProgram: (data: Partial<TrainingProgram>) =>
    apiClient.post<ApiResponse<TrainingProgram>>('/training/programs', data),

  updateProgram: (id: string, data: Partial<TrainingProgram>) =>
    apiClient.put<ApiResponse<TrainingProgram>>(`/training/programs/${id}`, data),

  deleteProgram: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/training/programs/${id}`),

  // Sessions
  getSessions: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<TrainingSession>>('/training/sessions', params),

  // Enrollments
  getEnrollments: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<Enrollment>>('/training/enrollments', params),

  getMyEnrollments: () =>
    apiClient.get<ApiResponse<Enrollment[]>>('/training/enrollments/mine'),

  enroll: (data: Partial<Enrollment>) =>
    apiClient.post<ApiResponse<Enrollment>>('/training/enrollments', data),

  cancelEnrollment: (id: string) =>
    apiClient.patch<ApiResponse<Enrollment>>(`/training/enrollments/${id}/cancel`),

  markCompleted: (id: string) =>
    apiClient.patch<ApiResponse<Enrollment>>(`/training/enrollments/${id}/complete`),

  // Feedback
  getFeedback: (programId: string) =>
    apiClient.get<ApiResponse<TrainingFeedback[]>>(`/training/feedback/${programId}`),

  submitFeedback: (data: Partial<TrainingFeedback>) =>
    apiClient.post<ApiResponse<TrainingFeedback>>('/training/feedback', data),

  // Certificates
  getCertificates: (employeeId: string) =>
    apiClient.get<ApiResponse<Certificate[]>>(`/training/certificates/${employeeId}`),

  issueCertificate: (enrollmentId: string) =>
    apiClient.post<ApiResponse<Certificate>>('/training/certificates', { enrollmentId }),
};
