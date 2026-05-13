'use client';
// ExpenseReports Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { ExpenseReport } from './types';

const mockExpenseReports: ExpenseReport[] = [
  { id: 'erpt-1', reportNumber: 'ER-001', title: 'Q1 Conference Travel', employeeId: 'u1', employeeName: 'Alice Smith', totalAmount: { amount: 1850, currency: 'USD' }, expenseCount: 5, status: 'approved', submittedDate: '2024-02-15', approvalSteps: [{ approverId: 'mgr-1', approverName: 'John Manager', status: 'approved', actionDate: '2024-02-16', comment: 'Approved' }], reimbursedDate: '', createdAt: '2024-02-15T10:00:00Z' },
  { id: 'erpt-2', reportNumber: 'ER-002', title: 'Office Supplies Feb', employeeId: 'u2', employeeName: 'Bob Jones', totalAmount: { amount: 320, currency: 'USD' }, expenseCount: 3, status: 'submitted', submittedDate: '2024-02-20', approvalSteps: [{ approverId: 'mgr-1', approverName: 'John Manager', status: 'pending', actionDate: '', comment: '' }], reimbursedDate: '', createdAt: '2024-02-20T10:00:00Z' },
  { id: 'erpt-3', reportNumber: 'ER-003', title: 'Client Dinner', employeeId: 'u1', employeeName: 'Alice Smith', totalAmount: { amount: 250, currency: 'USD' }, expenseCount: 1, status: 'reimbursed', submittedDate: '2024-01-10', approvalSteps: [{ approverId: 'mgr-1', approverName: 'John Manager', status: 'approved', actionDate: '2024-01-11', comment: 'OK' }], reimbursedDate: '2024-01-20', createdAt: '2024-01-10T10:00:00Z' },
];

export const expenseReportsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<ExpenseReport>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockExpenseReports];
    if (params?.search) data = data.filter(e => e.title.toLowerCase().includes(params.search!.toLowerCase()) || e.employeeName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<ExpenseReport>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockExpenseReports.find(e => e.id === id);
    if (!item) throw new Error('Expense report not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<ExpenseReport>): Promise<ApiResponse<ExpenseReport>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockExpenseReports[0], id: 'erpt-' + Date.now(), ...data } as ExpenseReport;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<ExpenseReport>): Promise<ApiResponse<ExpenseReport>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockExpenseReports.find(e => e.id === id);
    if (!existing) throw new Error('Expense report not found');
    return { success: true, data: { ...existing, ...data } as ExpenseReport };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
