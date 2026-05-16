'use client';
// Templates Service — Finance Shared
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Template } from './types';

const mockTemplates: Template[] = [
  { id: 'tmpl-1', name: 'Standard Invoice', type: 'invoice', variables: [{ name: 'company_name', label: 'Company Name', defaultValue: 'My Company' }, { name: 'invoice_number', label: 'Invoice Number', defaultValue: '' }], htmlContent: '<html>...</html>', isDefault: true, preview: '/previews/tmpl-1.png', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'tmpl-2', name: 'Modern Estimate', type: 'estimate', variables: [{ name: 'company_name', label: 'Company Name', defaultValue: 'My Company' }], htmlContent: '<html>...</html>', isDefault: true, preview: '/previews/tmpl-2.png', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'tmpl-3', name: 'Professional Invoice', type: 'invoice', variables: [{ name: 'company_name', label: 'Company Name', defaultValue: '' }, { name: 'logo_url', label: 'Logo URL', defaultValue: '' }], htmlContent: '<html>...</html>', isDefault: false, preview: '/previews/tmpl-3.png', createdAt: '2024-02-01T10:00:00Z' },
];

export const templatesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Template>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockTemplates];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Template>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockTemplates.find(e => e.id === id);
    if (!item) throw new Error('Template not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Template>): Promise<ApiResponse<Template>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockTemplates[0], id: 'tmpl-' + Date.now(), ...data } as Template;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Template>): Promise<ApiResponse<Template>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockTemplates.find(e => e.id === id);
    if (!existing) throw new Error('Template not found');
    return { success: true, data: { ...existing, ...data } as Template };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
