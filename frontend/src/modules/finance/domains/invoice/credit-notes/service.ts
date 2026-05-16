'use client';
// CreditNotes Service — Zoho Invoice
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { CreditNote } from './types';

const mockCreditNotes: CreditNote[] = [
  { id: 'cn-1', creditNoteNumber: 'CN-001', customerId: 'c1', customerName: 'Acme Corp', invoiceId: 'inv-1', amount: { amount: 500, currency: 'USD' }, status: 'open', date: '2024-01-25', reason: 'Partial refund for damaged goods', reference: 'REF-001', createdAt: '2024-01-25T10:00:00Z' },
  { id: 'cn-2', creditNoteNumber: 'CN-002', customerId: 'c2', customerName: 'Beta LLC', invoiceId: 'inv-2', amount: { amount: 1200, currency: 'USD' }, status: 'closed', date: '2024-02-01', reason: 'Overpayment adjustment', reference: 'REF-002', createdAt: '2024-02-01T10:00:00Z' },
  { id: 'cn-3', creditNoteNumber: 'CN-003', customerId: 'c3', customerName: 'Gamma Inc', invoiceId: 'inv-3', amount: { amount: 350, currency: 'USD' }, status: 'void', date: '2024-02-10', reason: 'Service cancellation', reference: '', createdAt: '2024-02-10T10:00:00Z' },
];

export const creditNotesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<CreditNote>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockCreditNotes];
    if (params?.search) data = data.filter(e => e.customerName.toLowerCase().includes(params.search!.toLowerCase()) || e.creditNoteNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<CreditNote>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockCreditNotes.find(e => e.id === id);
    if (!item) throw new Error('Credit note not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<CreditNote>): Promise<ApiResponse<CreditNote>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockCreditNotes[0], id: 'cn-' + Date.now(), ...data } as CreditNote;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<CreditNote>): Promise<ApiResponse<CreditNote>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockCreditNotes.find(e => e.id === id);
    if (!existing) throw new Error('Credit note not found');
    return { success: true, data: { ...existing, ...data } as CreditNote };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
