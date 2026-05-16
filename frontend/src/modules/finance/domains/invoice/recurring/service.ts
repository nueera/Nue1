'use client';
// Recurring Service — Zoho Invoice
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { RecurringInvoice } from './types';

const mockRecurring: RecurringInvoice[] = [
  { id: 'rec-1', profileName: 'Monthly Retainer', customerId: 'c1', customerName: 'Acme Corp', frequency: 'monthly', startDate: '2024-01-01', endDate: '2024-12-31', nextInvoiceDate: '2024-03-01', lastInvoiceDate: '2024-02-01', amount: { amount: 5000, currency: 'USD' }, status: 'active', invoicesGenerated: 2, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'rec-2', profileName: 'Quarterly Audit', customerId: 'c2', customerName: 'Beta LLC', frequency: 'quarterly', startDate: '2024-01-01', endDate: '2025-01-01', nextInvoiceDate: '2024-04-01', lastInvoiceDate: '2024-01-01', amount: { amount: 15000, currency: 'USD' }, status: 'active', invoicesGenerated: 1, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'rec-3', profileName: 'Weekly Support', customerId: 'c3', customerName: 'Gamma Inc', frequency: 'weekly', startDate: '2024-02-01', endDate: '2024-04-30', nextInvoiceDate: '2024-02-12', lastInvoiceDate: '2024-02-05', amount: { amount: 1500, currency: 'USD' }, status: 'paused', invoicesGenerated: 1, createdAt: '2024-02-01T10:00:00Z' },
];

export const recurringService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<RecurringInvoice>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockRecurring];
    if (params?.search) data = data.filter(e => e.profileName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<RecurringInvoice>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockRecurring.find(e => e.id === id);
    if (!item) throw new Error('Recurring profile not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<RecurringInvoice>): Promise<ApiResponse<RecurringInvoice>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockRecurring[0], id: 'rec-' + Date.now(), ...data } as RecurringInvoice;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<RecurringInvoice>): Promise<ApiResponse<RecurringInvoice>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockRecurring.find(e => e.id === id);
    if (!existing) throw new Error('Recurring profile not found');
    return { success: true, data: { ...existing, ...data } as RecurringInvoice };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
