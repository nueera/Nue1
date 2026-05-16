'use client';
// Coupons Service — Zoho Billing
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Coupon } from './types';

const mockCoupons: Coupon[] = [
  { id: 'coup-1', code: 'WELCOME20', discountType: 'percentage', discountValue: 20, maxRedemptions: 1000, usedCount: 342, validFrom: '2024-01-01', validTo: '2024-12-31', status: 'active', rules: { minPurchaseAmount: { amount: 0, currency: 'USD' }, maxRedemptionsPerCustomer: 1, applicableProductIds: ['bp-1', 'bp-2'], applicablePlanIds: ['plan-1'], firstTimeOnly: true }, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'coup-2', code: 'SAVE50', discountType: 'flat', discountValue: 50, maxRedemptions: 500, usedCount: 89, validFrom: '2024-02-01', validTo: '2024-06-30', status: 'active', rules: { minPurchaseAmount: { amount: 100, currency: 'USD' }, maxRedemptionsPerCustomer: 3, applicableProductIds: ['bp-2'], applicablePlanIds: ['plan-2'], firstTimeOnly: false }, createdAt: '2024-02-01T10:00:00Z' },
  { id: 'coup-3', code: 'EARLYBIRD', discountType: 'percentage', discountValue: 30, maxRedemptions: 100, usedCount: 100, validFrom: '2023-01-01', validTo: '2023-03-31', status: 'expired', rules: { minPurchaseAmount: { amount: 0, currency: 'USD' }, maxRedemptionsPerCustomer: 1, applicableProductIds: [], applicablePlanIds: [], firstTimeOnly: true }, createdAt: '2023-01-01T10:00:00Z' },
];

export const couponsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Coupon>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockCoupons];
    if (params?.search) data = data.filter(e => e.code.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Coupon>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockCoupons.find(e => e.id === id);
    if (!item) throw new Error('Coupon not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Coupon>): Promise<ApiResponse<Coupon>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockCoupons[0], id: 'coup-' + Date.now(), ...data } as Coupon;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Coupon>): Promise<ApiResponse<Coupon>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockCoupons.find(e => e.id === id);
    if (!existing) throw new Error('Coupon not found');
    return { success: true, data: { ...existing, ...data } as Coupon };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
  getStats: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
};
