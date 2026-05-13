'use client';
// Workflows Service — Finance Shared
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Workflow } from './types';

const mockWorkflows: Workflow[] = [
  { id: 'wf-1', name: 'Auto-send invoice on creation', description: 'Automatically send invoice when created', entityType: 'invoice', trigger: 'on_create', rules: [], steps: [{ action: 'send_email', config: { template: 'invoice-created' }, order: 1 }], isActive: true, executionCount: 150, lastExecutedAt: '2024-02-20T10:00:00Z', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'wf-2', name: 'Late payment reminder', description: 'Send reminder when invoice is overdue', entityType: 'invoice', trigger: 'scheduled', rules: [{ field: 'status', operator: 'equals', value: 'overdue' }], steps: [{ action: 'send_email', config: { template: 'payment-reminder' }, order: 1 }, { action: 'notify', config: { channel: 'slack' }, order: 2 }], isActive: true, executionCount: 45, lastExecutedAt: '2024-02-19T06:00:00Z', createdAt: '2024-01-15T10:00:00Z' },
  { id: 'wf-3', name: 'Expense approval notification', description: 'Notify approver on new expense report', entityType: 'expense_report', trigger: 'on_create', rules: [], steps: [{ action: 'notify', config: { recipient: 'approver' }, order: 1 }], isActive: true, executionCount: 89, lastExecutedAt: '2024-02-18T14:30:00Z', createdAt: '2024-01-10T10:00:00Z' },
];

export const workflowsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Workflow>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockWorkflows];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Workflow>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockWorkflows.find(e => e.id === id);
    if (!item) throw new Error('Workflow not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Workflow>): Promise<ApiResponse<Workflow>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockWorkflows[0], id: 'wf-' + Date.now(), ...data } as Workflow;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Workflow>): Promise<ApiResponse<Workflow>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockWorkflows.find(e => e.id === id);
    if (!existing) throw new Error('Workflow not found');
    return { success: true, data: { ...existing, ...data } as Workflow };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
