import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { LoanType, LoanApplication, Loan, RepaymentSchedule } from '../types';

type ServiceParams = Record<string, string | number | boolean | undefined>;

export const loanService = {
  // Loan Types
  getLoanTypes: () =>
    apiClient.get<ApiResponse<LoanType[]>>('/loans/types'),

  getLoanType: (id: string) =>
    apiClient.get<ApiResponse<LoanType>>(`/loans/types/${id}`),

  createLoanType: (data: Partial<LoanType>) =>
    apiClient.post<ApiResponse<LoanType>>('/loans/types', data),

  updateLoanType: (id: string, data: Partial<LoanType>) =>
    apiClient.put<ApiResponse<LoanType>>(`/loans/types/${id}`, data),

  deleteLoanType: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/loans/types/${id}`),

  // Loan Applications
  getApplications: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<LoanApplication>>('/loans/applications', params),

  getApplication: (id: string) =>
    apiClient.get<ApiResponse<LoanApplication>>(`/loans/applications/${id}`),

  applyLoan: (data: Partial<LoanApplication>) =>
    apiClient.post<ApiResponse<LoanApplication>>('/loans/applications', data),

  approveLoan: (id: string, data: { comments?: string; approvedAmount?: number; disbursalDate?: string }) =>
    apiClient.patch<ApiResponse<LoanApplication>>(`/loans/applications/${id}/approve`, data),

  rejectLoan: (id: string, reason: string) =>
    apiClient.patch<ApiResponse<LoanApplication>>(`/loans/applications/${id}/reject`, { reason }),

  // Active Loans
  getActiveLoans: (employeeId: string) =>
    apiClient.get<ApiResponse<Loan[]>>(`/loans/active/${employeeId}`),

  // Repayment Schedules
  getRepaymentSchedule: (loanId: string) =>
    apiClient.get<ApiResponse<RepaymentSchedule[]>>(`/loans/${loanId}/schedule`),
};
