'use client';
// Plans Service — Zoho Billing
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Plan } from './types';

const mockPlans: Plan[] = [
  { id: 'plan-1', name: 'Starter Monthly', productId: 'bp-1', productName: 'Pro Plan', price: { amount: 49, currency: 'USD' }, frequency: 'monthly', trialDays: 14, setupFee: { amount: 0, currency: 'USD' }, features: ['5 users', '10GB storage'], status: 'active', subscriberCount: 120, pricingTiers: [{ from: 1, to: 10, price: { amount: 49, currency: 'USD' } }, { from: 11, to: null, price: { amount: 39, currency: 'USD' } }], createdAt: '2024-01-01T10:00:00Z' },
  { id: 'plan-2', name: 'Enterprise Annual', productId: 'bp-2', productName: 'Enterprise Plan', price: { amount: 199, currency: 'USD' }, frequency: 'annually', trialDays: 30, setupFee: { amount: 500, currency: 'USD' }, features: ['Unlimited users', '1TB storage', 'Priority support'], status: 'active', subscriberCount: 45, pricingTiers: [{ from: 1, to: 5, price: { amount: 199, currency: 'USD' } }, { from: 6, to: 20, price: { amount: 169, currency: 'USD' } }, { from: 21, to: null, price: { amount: 149, currency: 'USD' } }], createdAt: '2024-01-01T10:00:00Z' },
  { id: 'plan-3', name: 'Starter Quarterly', productId: 'bp-1', productName: 'Pro Plan', price: { amount: 129, currency: 'USD' }, frequency: 'quarterly', trialDays: 14, setupFee: { amount: 0, currency: 'USD' }, features: ['5 users', '10GB storage'], status: 'active', subscriberCount: 35, pricingTiers: [{ from: 1, to: null, price: { amount: 129, currency: 'USD' } }], createdAt: '2024-02-01T10:00:00Z' },
];

export const plansService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Plan>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPlans];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Plan>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPlans.find(e => e.id === id);
    if (!item) throw new Error('Plan not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPlans[0], id: 'plan-' + Date.now(), ...data } as Plan;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPlans.find(e => e.id === id);
    if (!existing) throw new Error('Plan not found');
    return { success: true, data: { ...existing, ...data } as Plan };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
