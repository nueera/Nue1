'use client';
// Subscriptions Service — Zoho Billing
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Subscription, SubscriptionChange, SubscriptionCancel } from './types';

const mockSubscriptions: Subscription[] = [
  { id: 'sub-1', customerId: 'c1', customerName: 'Acme Corp', planId: 'plan-1', planName: 'Starter Monthly', amount: { amount: 49, currency: 'USD' }, frequency: 'monthly', startDate: '2024-01-15', nextBilling: '2024-03-15', status: 'live', trialEnd: '2024-01-29', couponId: 'coup-1', addOns: [{ addonId: 'add-1', quantity: 2 }], pendingChange: null, createdAt: '2024-01-15T10:00:00Z' },
  { id: 'sub-2', customerId: 'c2', customerName: 'Beta LLC', planId: 'plan-2', planName: 'Enterprise Annual', amount: { amount: 199, currency: 'USD' }, frequency: 'annually', startDate: '2024-02-01', nextBilling: '2025-02-01', status: 'live', trialEnd: '2024-03-01', couponId: '', addOns: [{ addonId: 'add-2', quantity: 1 }], pendingChange: { fromPlanId: 'plan-1', toPlanId: 'plan-2', effectiveDate: '2024-03-01', prorate: true }, createdAt: '2024-02-01T10:00:00Z' },
  { id: 'sub-3', customerId: 'c3', customerName: 'Gamma Inc', planId: 'plan-1', planName: 'Starter Monthly', amount: { amount: 49, currency: 'USD' }, frequency: 'monthly', startDate: '2023-06-01', nextBilling: '2024-03-01', status: 'paused', trialEnd: '', couponId: '', addOns: [], pendingChange: null, createdAt: '2023-06-01T10:00:00Z' },
];

export const subscriptionsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Subscription>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockSubscriptions];
    if (params?.search) data = data.filter(e => e.customerName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Subscription>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockSubscriptions.find(e => e.id === id);
    if (!item) throw new Error('Subscription not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Subscription>): Promise<ApiResponse<Subscription>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockSubscriptions[0], id: 'sub-' + Date.now(), ...data } as Subscription;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Subscription>): Promise<ApiResponse<Subscription>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockSubscriptions.find(e => e.id === id);
    if (!existing) throw new Error('Subscription not found');
    return { success: true, data: { ...existing, ...data } as Subscription };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
  changePlan: async (id: string, change: SubscriptionChange): Promise<ApiResponse<Subscription>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockSubscriptions.find(e => e.id === id);
    if (!existing) throw new Error('Subscription not found');
    return { success: true, data: { ...existing, pendingChange: change } };
  },
  cancel: async (id: string, cancel: SubscriptionCancel): Promise<ApiResponse<Subscription>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockSubscriptions.find(e => e.id === id);
    if (!existing) throw new Error('Subscription not found');
    return { success: true, data: { ...existing, status: 'cancelled' } };
  },
};
