'use client';
// PaymentPages Service — Zoho Checkout
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { PaymentPage } from './types';

const mockPaymentPages: PaymentPage[] = [
  { id: 'pp-1', name: 'Pro Plan Checkout', slug: 'pro-plan', url: 'https://pay.example.com/pro-plan', planId: 'plan-1', planName: 'Starter Monthly', amount: { amount: 49, currency: 'USD' }, status: 'active', fields: [{ name: 'email', label: 'Email', type: 'email', required: true, options: [] }, { name: 'company', label: 'Company', type: 'text', required: false, options: [] }], theme: { primaryColor: '#4F46E5', backgroundColor: '#FFFFFF', logo: '/logo.svg', fontFamily: 'Inter', borderRadius: '8px' }, successUrl: '/thanks', failureUrl: '/error', visitCount: 1250, conversionCount: 340, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'pp-2', name: 'Enterprise Checkout', slug: 'enterprise', url: 'https://pay.example.com/enterprise', planId: 'plan-2', planName: 'Enterprise Annual', amount: { amount: 199, currency: 'USD' }, status: 'active', fields: [{ name: 'email', label: 'Email', type: 'email', required: true, options: [] }], theme: { primaryColor: '#1E3A5F', backgroundColor: '#F8FAFC', logo: '/logo.svg', fontFamily: 'Inter', borderRadius: '12px' }, successUrl: '/thanks', failureUrl: '/error', visitCount: 450, conversionCount: 89, createdAt: '2024-01-15T10:00:00Z' },
];

export const paymentPagesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<PaymentPage>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPaymentPages];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<PaymentPage>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPaymentPages.find(e => e.id === id);
    if (!item) throw new Error('Payment page not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<PaymentPage>): Promise<ApiResponse<PaymentPage>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPaymentPages[0], id: 'pp-' + Date.now(), ...data } as PaymentPage;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<PaymentPage>): Promise<ApiResponse<PaymentPage>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPaymentPages.find(e => e.id === id);
    if (!existing) throw new Error('Payment page not found');
    return { success: true, data: { ...existing, ...data } as PaymentPage };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
