import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { ReviewCycle, Goal, Review, Feedback } from '../types';

export const performanceService = {
  getCycles: () =>
    apiClient.get<ApiResponse<ReviewCycle[]>>('/performance/cycles'),

  getGoals: (userId: string) =>
    apiClient.get<ApiResponse<Goal[]>>(`/performance/goals/${userId}`),

  getReviews: (cycleId: string) =>
    apiClient.get<PaginatedResponse<Review>>(`/performance/reviews`, { cycleId }),

  getFeedback: (employeeId: string) =>
    apiClient.get<ApiResponse<Feedback[]>>(`/performance/feedback/${employeeId}`),

  createCycle: (data: Partial<ReviewCycle>) =>
    apiClient.post<ApiResponse<ReviewCycle>>('/performance/cycles', data),

  setGoal: (data: Partial<Goal>) =>
    apiClient.post<ApiResponse<Goal>>('/performance/goals', data),

  submitReview: (data: Partial<Review>) =>
    apiClient.post<ApiResponse<Review>>('/performance/reviews', data),
};
