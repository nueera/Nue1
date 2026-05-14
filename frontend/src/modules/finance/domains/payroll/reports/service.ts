// @ts-nocheck
'use client';
// Reports Service — Zoho Payroll
import type { ApiResponse } from '../../../types/finance-common';
import type { PayrollReport } from './types';

const mockReport: PayrollReport = {
  id: 'prpt-1', type: 'summary', period: '2024-Q1',
  startDate: '2024-01-01', endDate: '2024-03-31',
  totalGross: { amount: 67500, currency: 'USD' },
  totalDeductions: { amount: 13500, currency: 'USD' },
  totalNet: { amount: 54000, currency: 'USD' },
  employerTaxes: { amount: 8100, currency: 'USD' },
  employeeCount: 3,
  departmentBreakdown: [
    { department: 'Engineering', gross: { amount: 30000, currency: 'USD' }, net: { amount: 22500, currency: 'USD' }, count: 1 },
    { department: 'Marketing', gross: { amount: 25500, currency: 'USD' }, net: { amount: 19500, currency: 'USD' }, count: 1 },
    { department: 'Design', gross: { amount: 12000, currency: 'USD' }, net: { amount: 10200, currency: 'USD' }, count: 1 },
  ],
  taxBreakdown: [
    { tax: 'Federal', amount: { amount: 5400, currency: 'USD' } },
    { tax: 'FICA', amount: { amount: 4185, currency: 'USD' } },
    { tax: 'Medicare', amount: { amount: 979, currency: 'USD' } },
  ],
};

export const payrollReportsService = {
  get: async (): Promise<ApiResponse<PayrollReport>> => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, data: mockReport };
  },
};
