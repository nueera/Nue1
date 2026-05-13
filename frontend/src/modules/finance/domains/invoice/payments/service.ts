'use client';
// Payments Service — Zoho Invoice
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { InvoicePayment } from './types';

const mockPayments: InvoicePayment[] = [
  { id: 'pay-1', paymentNumber: 'PAY-001', customerId: 'c1', customerName: 'Acme Corp', invoiceId: 'inv-2', amount: { amount: 13200, currency: 'USD' }, date: '2024-01-20', method: 'bank_transfer', reference: 'TXN-001', status: 'completed', gateway: 'stripe', thankYouPage: '/thanks/payment', thankYouMessage: 'Thank you for your payment!', sendThankYouEmail: true, createdAt: '2024-01-20T10:00:00Z' },
  { id: 'pay-2', paymentNumber: 'PAY-002', customerId: 'c2', customerName: 'Beta LLC', invoiceId: 'inv-1', amount: { amount: 2750, currency: 'USD' }, date: '2024-02-01', method: 'credit_card', reference: 'TXN-002', status: 'completed', gateway: 'paypal', thankYouPage: '/thanks/payment', thankYouMessage: 'Payment received successfully!', sendThankYouEmail: true, createdAt: '2024-02-01T10:00:00Z' },
  { id: 'pay-3', paymentNumber: 'PAY-003', customerId: 'c3', customerName: 'Gamma Inc', invoiceId: 'inv-3', amount: { amount: 1000, currency: 'USD' }, date: '2024-02-15', method: 'check', reference: 'CHK-001', status: 'pending', gateway: '', thankYouPage: '', thankYouMessage: '', sendThankYouEmail: false, createdAt: '2024-02-15T10:00:00Z' },
];

export const paymentsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<InvoicePayment>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPayments];
    if (params?.search) data = data.filter(e => e.customerName.toLowerCase().includes(params.search!.toLowerCase()) || e.paymentNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<InvoicePayment>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPayments.find(e => e.id === id);
    if (!item) throw new Error('Payment not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<InvoicePayment>): Promise<ApiResponse<InvoicePayment>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPayments[0], id: 'pay-' + Date.now(), ...data } as InvoicePayment;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<InvoicePayment>): Promise<ApiResponse<InvoicePayment>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPayments.find(e => e.id === id);
    if (!existing) throw new Error('Payment not found');
    return { success: true, data: { ...existing, ...data } as InvoicePayment };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
