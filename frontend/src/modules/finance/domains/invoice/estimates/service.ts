'use client';
// Estimates Service — Zoho Invoice
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { InvoiceEstimate } from './types';

const mockEstimates: InvoiceEstimate[] = [
  { id: 'est-1', estimateNumber: 'EST-001', customerId: 'c1', customerName: 'Acme Corp', lineItems: [], subtotal: { amount: 1000, currency: 'USD' }, taxTotal: { amount: 100, currency: 'USD' }, total: { amount: 1100, currency: 'USD' }, status: 'draft', date: '2024-01-15', expiryDate: '2024-02-15', type: 'detailed', notes: '', templateId: 'tmpl-1', createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z' },
  { id: 'est-2', estimateNumber: 'EST-002', customerId: 'c2', customerName: 'Beta LLC', lineItems: [], subtotal: { amount: 2500, currency: 'USD' }, taxTotal: { amount: 250, currency: 'USD' }, total: { amount: 2750, currency: 'USD' }, status: 'sent', date: '2024-01-20', expiryDate: '2024-02-20', type: 'itemized', notes: 'Priority delivery', templateId: 'tmpl-1', createdAt: '2024-01-20T10:00:00Z', updatedAt: '2024-01-20T10:00:00Z' },
  { id: 'est-3', estimateNumber: 'EST-003', customerId: 'c3', customerName: 'Gamma Inc', lineItems: [], subtotal: { amount: 800, currency: 'USD' }, taxTotal: { amount: 80, currency: 'USD' }, total: { amount: 880, currency: 'USD' }, status: 'approved', date: '2024-02-01', expiryDate: '2024-03-01', type: 'service', notes: '', templateId: 'tmpl-2', createdAt: '2024-02-01T10:00:00Z', updatedAt: '2024-02-01T10:00:00Z' },
];

export const estimatesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<InvoiceEstimate>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockEstimates];
    if (params?.search) data = data.filter(e => e.customerName.toLowerCase().includes(params.search!.toLowerCase()) || e.estimateNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<InvoiceEstimate>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockEstimates.find(e => e.id === id);
    if (!item) throw new Error('Estimate not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<InvoiceEstimate>): Promise<ApiResponse<InvoiceEstimate>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockEstimates[0], id: 'est-' + Date.now(), ...data } as InvoiceEstimate;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<InvoiceEstimate>): Promise<ApiResponse<InvoiceEstimate>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockEstimates.find(e => e.id === id);
    if (!existing) throw new Error('Estimate not found');
    return { success: true, data: { ...existing, ...data } as InvoiceEstimate };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
  getStats: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  convertToInvoice: async (...args: unknown[]) => ({ data: [] }),
  send: async (...args: unknown[]) => ({ success: true, data: {} }),
};
