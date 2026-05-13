import { apiClient } from '../../../core/services/api-client';
import type { ApiResponse, PaginatedResponse } from '../../../core/types';
import type { PayrollRecord, PayrollRun, Payslip } from '../types';

type ServiceParams = Record<string, string | number | boolean | undefined>;

export const payrollService = {
  getRecords: (params?: ServiceParams) =>
    apiClient.get<PaginatedResponse<PayrollRecord>>('/payroll', params),

  getRuns: (month: string) =>
    apiClient.get<ApiResponse<PayrollRun[]>>(`/payroll/runs`, { month }),

  getPayslip: (id: string) =>
    apiClient.get<ApiResponse<Payslip>>(`/payroll/payslip/${id}`),

  runPayroll: (month: string) =>
    apiClient.post<ApiResponse<PayrollRun>>('/payroll/run', { month }),
};
