// @ts-nocheck
'use client';
// PayRuns Service — Zoho Payroll
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { PayRun } from './types';

const mockPayRuns: PayRun[] = [
  { id: 'pr-1', payRunNumber: 'PR-2024-02', periodStart: '2024-02-01', periodEnd: '2024-02-29', payDate: '2024-03-01', status: 'completed', employeeCount: 3, grossTotal: { amount: 22500, currency: 'USD' }, deductionsTotal: { amount: 4500, currency: 'USD' }, netTotal: { amount: 18000, currency: 'USD' }, payslips: [{ employeeId: 'emp-1', employeeName: 'Alice Smith', grossEarnings: { amount: 10000, currency: 'USD' }, totalDeductions: { amount: 2500, currency: 'USD' }, netPay: { amount: 7500, currency: 'USD' }, lines: [] }, { employeeId: 'emp-2', employeeName: 'Bob Jones', grossEarnings: { amount: 8500, currency: 'USD' }, totalDeductions: { amount: 2000, currency: 'USD' }, netPay: { amount: 6500, currency: 'USD' }, lines: [] }], createdAt: '2024-02-25T10:00:00Z' },
  { id: 'pr-2', payRunNumber: 'PR-2024-03', periodStart: '2024-03-01', periodEnd: '2024-03-31', payDate: '2024-04-01', status: 'draft', employeeCount: 3, grossTotal: { amount: 22500, currency: 'USD' }, deductionsTotal: { amount: 4500, currency: 'USD' }, netTotal: { amount: 18000, currency: 'USD' }, payslips: [], createdAt: '2024-03-25T10:00:00Z' },
];

export const payRunsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<PayRun>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPayRuns];
    if (params?.search) data = data.filter(e => e.payRunNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<PayRun>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPayRuns.find(e => e.id === id);
    if (!item) throw new Error('Pay run not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<PayRun>): Promise<ApiResponse<PayRun>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPayRuns[0], id: 'pr-' + Date.now(), ...data } as PayRun;
    return { success: true, data: item };
  },
  process: async (id: string): Promise<ApiResponse<PayRun>> => {
    await new Promise(r => setTimeout(r, 300));
    const existing = mockPayRuns.find(e => e.id === id);
    if (!existing) throw new Error('Pay run not found');
    return { success: true, data: { ...existing, status: 'completed' } };
  },
};
