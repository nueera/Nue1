'use client';
// PaymentLinks Service — Zoho Checkout
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { PaymentLink } from './types';

const mockPaymentLinks: PaymentLink[] = [
  { id: 'pl-1', name: 'Invoice INV-001 Payment', url: 'https://pay.example.com/link/pl-1', amount: { amount: 5500, currency: 'USD' }, description: 'Payment for Invoice INV-001', status: 'active', expiryDate: '2024-03-15', maxUses: 1, usedCount: 0, customerId: 'c1', customerName: 'Acme Corp', createdAt: '2024-02-15T10:00:00Z' },
  { id: 'pl-2', name: 'Invoice INV-002 Payment', url: 'https://pay.example.com/link/pl-2', amount: { amount: 13200, currency: 'USD' }, description: 'Payment for Invoice INV-002', status: 'used', expiryDate: '2024-02-28', maxUses: 1, usedCount: 1, customerId: 'c2', customerName: 'Beta LLC', createdAt: '2024-02-01T10:00:00Z' },
  { id: 'pl-3', name: 'Consultation Fee', url: 'https://pay.example.com/link/pl-3', amount: { amount: 500, currency: 'USD' }, description: 'One-time consultation', status: 'expired', expiryDate: '2024-01-31', maxUses: 10, usedCount: 3, customerId: '', customerName: '', createdAt: '2024-01-01T10:00:00Z' },
];

export const paymentLinksService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<PaymentLink>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPaymentLinks];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.customerName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<PaymentLink>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPaymentLinks.find(e => e.id === id);
    if (!item) throw new Error('Payment link not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<PaymentLink>): Promise<ApiResponse<PaymentLink>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPaymentLinks[0], id: 'pl-' + Date.now(), ...data } as PaymentLink;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<PaymentLink>): Promise<ApiResponse<PaymentLink>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPaymentLinks.find(e => e.id === id);
    if (!existing) throw new Error('Payment link not found');
    return { success: true, data: { ...existing, ...data } as PaymentLink };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
