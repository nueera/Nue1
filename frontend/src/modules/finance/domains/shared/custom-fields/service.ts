'use client';
// CustomFields Service — Finance Shared
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { CustomField } from './types';

const mockCustomFields: CustomField[] = [
  { id: 'cf-1', name: 'project_code', label: 'Project Code', type: 'text', entityType: 'invoice', renderer: { component: 'input', placeholder: 'Enter project code', options: [], validationPattern: '^[A-Z]{2}-\d{4}$' }, isRequired: false, isUnique: true, defaultValue: '', sortOrder: 1, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'cf-2', name: 'department', label: 'Department', type: 'select', entityType: 'expense', renderer: { component: 'select', placeholder: 'Select department', options: ['Engineering', 'Marketing', 'Sales', 'Operations'], validationPattern: '' }, isRequired: true, isUnique: false, defaultValue: 'Engineering', sortOrder: 2, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'cf-3', name: 'billable', label: 'Billable', type: 'checkbox', entityType: 'time_entry', renderer: { component: 'checkbox', placeholder: '', options: [], validationPattern: '' }, isRequired: false, isUnique: false, defaultValue: 'true', sortOrder: 3, createdAt: '2024-01-15T10:00:00Z' },
];

export const customFieldsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<CustomField>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockCustomFields];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.label.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getForEntity: async (entityType: string): Promise<ApiResponse<CustomField[]>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: mockCustomFields.filter(f => f.entityType === entityType) };
  },
  create: async (data: Partial<CustomField>): Promise<ApiResponse<CustomField>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockCustomFields[0], id: 'cf-' + Date.now(), ...data } as CustomField;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<CustomField>): Promise<ApiResponse<CustomField>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockCustomFields.find(e => e.id === id);
    if (!existing) throw new Error('Custom field not found');
    return { success: true, data: { ...existing, ...data } as CustomField };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
  getById: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
};
