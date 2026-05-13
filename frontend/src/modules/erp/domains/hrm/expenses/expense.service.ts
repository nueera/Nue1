import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { ExpenseClaim, ExpenseCategory, EmployeeAdvance, TravelRequest } from '../types';

type ServiceParams = Record<string, string | number | boolean | undefined>;

export const expenseService = {
  // Claims
  getClaims: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<ExpenseClaim>>('/expenses/claims', params),

  getClaim: (id: string) =>
    apiClient.get<ApiResponse<ExpenseClaim>>(`/expenses/claims/${id}`),

  createClaim: (data: Partial<ExpenseClaim>) =>
    apiClient.post<ApiResponse<ExpenseClaim>>('/expenses/claims', data),

  updateClaim: (id: string, data: Partial<ExpenseClaim>) =>
    apiClient.put<ApiResponse<ExpenseClaim>>(`/expenses/claims/${id}`, data),

  deleteClaim: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/expenses/claims/${id}`),

  approveClaim: (id: string) =>
    apiClient.patch<ApiResponse<ExpenseClaim>>(`/expenses/claims/${id}/approve`),

  rejectClaim: (id: string, reason: string) =>
    apiClient.patch<ApiResponse<ExpenseClaim>>(`/expenses/claims/${id}/reject`, { reason }),

  // Categories
  getCategories: () =>
    apiClient.get<ApiResponse<ExpenseCategory[]>>('/expenses/categories'),

  // Advances
  getAdvances: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<EmployeeAdvance>>('/expenses/advances', params),

  requestAdvance: (data: Partial<EmployeeAdvance>) =>
    apiClient.post<ApiResponse<EmployeeAdvance>>('/expenses/advances', data),

  settleAdvance: (id: string, data: Partial<EmployeeAdvance>) =>
    apiClient.patch<ApiResponse<EmployeeAdvance>>(`/expenses/advances/${id}/settle`, data),

  // Travel Requests
  getTravelRequests: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<TravelRequest>>('/expenses/travel-requests', params),

  createTravelRequest: (data: Partial<TravelRequest>) =>
    apiClient.post<ApiResponse<TravelRequest>>('/expenses/travel-requests', data),

  approveTravelRequest: (id: string) =>
    apiClient.patch<ApiResponse<TravelRequest>>(`/expenses/travel-requests/${id}/approve`),

  rejectTravelRequest: (id: string, reason: string) =>
    apiClient.patch<ApiResponse<TravelRequest>>(`/expenses/travel-requests/${id}/reject`, { reason }),
};
