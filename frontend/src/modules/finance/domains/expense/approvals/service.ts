'use client';
// Approvals Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { ApprovalFlow, ApprovalAction } from './types';

const mockApprovals: ApprovalFlow[] = [
  { id: 'apr-1', entityType: 'expense_report', entityId: 'erpt-2', entityName: 'Office Supplies Feb', requestedBy: 'u2', requestedByName: 'Bob Jones', currentStep: 1, totalSteps: 2, steps: [{ stepOrder: 1, approverId: 'mgr-1', approverName: 'John Manager', action: null, actionDate: '', comment: '' }, { stepOrder: 2, approverId: 'fin-1', approverName: 'Finance Team', action: null, actionDate: '', comment: '' }], status: 'pending', createdAt: '2024-02-20T10:00:00Z' },
  { id: 'apr-2', entityType: 'purchase_request', entityId: 'pr-1', entityName: 'PR-001', requestedBy: 'u1', requestedByName: 'Alice Smith', currentStep: 1, totalSteps: 1, steps: [{ stepOrder: 1, approverId: 'mgr-1', approverName: 'John Manager', action: null, actionDate: '', comment: '' }], status: 'pending', createdAt: '2024-02-15T10:00:00Z' },
  { id: 'apr-3', entityType: 'advance', entityId: 'adv-1', entityName: 'ADV-001', requestedBy: 'u1', requestedByName: 'Alice Smith', currentStep: 2, totalSteps: 2, steps: [{ stepOrder: 1, approverId: 'mgr-1', approverName: 'John Manager', action: 'approve', actionDate: '2024-02-02', comment: 'OK' }, { stepOrder: 2, approverId: 'fin-1', approverName: 'Finance Team', action: 'approve', actionDate: '2024-02-03', comment: 'Approved' }], status: 'approved', createdAt: '2024-02-01T10:00:00Z' },
];

export const approvalsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<ApprovalFlow>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockApprovals];
    if (params?.search) data = data.filter(e => e.entityName.toLowerCase().includes(params.search!.toLowerCase()) || e.requestedByName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<ApprovalFlow>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockApprovals.find(e => e.id === id);
    if (!item) throw new Error('Approval not found');
    return { success: true, data: item };
  },
  approve: async (id: string, comment: string): Promise<ApiResponse<ApprovalFlow>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockApprovals.find(e => e.id === id);
    if (!existing) throw new Error('Approval not found');
    return { success: true, data: { ...existing, status: 'approved' } };
  },
  reject: async (id: string, comment: string): Promise<ApiResponse<ApprovalFlow>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockApprovals.find(e => e.id === id);
    if (!existing) throw new Error('Approval not found');
    return { success: true, data: { ...existing, status: 'rejected' } };
  },
  delegate: async (id: string, toUserId: string, comment: string): Promise<ApiResponse<ApprovalFlow>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockApprovals.find(e => e.id === id);
    if (!existing) throw new Error('Approval not found');
    return { success: true, data: existing };
  },
};
