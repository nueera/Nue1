'use client';
// Invoices Service — Zoho Invoice
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { InvoiceInvoice } from './types';

const mockInvoices: InvoiceInvoice[] = [
  { id: 'inv-1', invoiceNumber: 'INV-001', customerId: 'c1', customerName: 'Acme Corp', lineItems: [], subtotal: { amount: 5000, currency: 'USD' }, taxTotal: { amount: 500, currency: 'USD' }, total: { amount: 5500, currency: 'USD' }, status: 'sent', date: '2024-01-10', dueDate: '2024-02-10', paymentTermsId: 'pt-1', notes: '', templateId: 'tmpl-1', lastPaymentDate: '', balance: { amount: 5500, currency: 'USD' }, autoRemind: true, remindDaysBefore: 3, remindFrequency: 'weekly', createdAt: '2024-01-10T10:00:00Z', updatedAt: '2024-01-10T10:00:00Z' },
  { id: 'inv-2', invoiceNumber: 'INV-002', customerId: 'c2', customerName: 'Beta LLC', lineItems: [], subtotal: { amount: 12000, currency: 'USD' }, taxTotal: { amount: 1200, currency: 'USD' }, total: { amount: 13200, currency: 'USD' }, status: 'paid', date: '2024-01-05', dueDate: '2024-02-05', paymentTermsId: 'pt-1', notes: '', templateId: 'tmpl-1', lastPaymentDate: '2024-01-20', balance: { amount: 0, currency: 'USD' }, autoRemind: false, remindDaysBefore: 7, remindFrequency: 'once', createdAt: '2024-01-05T10:00:00Z', updatedAt: '2024-01-20T10:00:00Z' },
  { id: 'inv-3', invoiceNumber: 'INV-003', customerId: 'c3', customerName: 'Gamma Inc', lineItems: [], subtotal: { amount: 3500, currency: 'USD' }, taxTotal: { amount: 350, currency: 'USD' }, total: { amount: 3850, currency: 'USD' }, status: 'overdue', date: '2023-12-15', dueDate: '2024-01-15', paymentTermsId: 'pt-2', notes: 'Follow up required', templateId: 'tmpl-2', lastPaymentDate: '', balance: { amount: 3850, currency: 'USD' }, autoRemind: true, remindDaysBefore: 5, remindFrequency: 'daily', createdAt: '2023-12-15T10:00:00Z', updatedAt: '2023-12-15T10:00:00Z' },
];

export const invoicesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<InvoiceInvoice>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockInvoices];
    if (params?.search) data = data.filter(e => e.customerName.toLowerCase().includes(params.search!.toLowerCase()) || e.invoiceNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<InvoiceInvoice>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockInvoices.find(e => e.id === id);
    if (!item) throw new Error('Invoice not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<InvoiceInvoice>): Promise<ApiResponse<InvoiceInvoice>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockInvoices[0], id: 'inv-' + Date.now(), ...data } as InvoiceInvoice;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<InvoiceInvoice>): Promise<ApiResponse<InvoiceInvoice>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockInvoices.find(e => e.id === id);
    if (!existing) throw new Error('Invoice not found');
    return { success: true, data: { ...existing, ...data } as InvoiceInvoice };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
  recordPayment: async (...args: unknown[]) => ({ data: [] }),
  getStats: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  send: async (...args: unknown[]) => ({ success: true, data: {} }),
};
