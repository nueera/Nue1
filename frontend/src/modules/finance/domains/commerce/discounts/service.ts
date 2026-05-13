'use client';
// Discounts Service — Zoho Commerce
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Discount } from './types';

const mockDiscounts: Discount[] = [
  { id: 'disc-1', name: 'Summer Sale 20%', code: 'SUMMER20', type: 'percentage', value: 20, status: 'active', conditions: { minPurchase: { amount: 50, currency: 'USD' }, minQuantity: 0, applicableCategories: [], applicableProducts: [], customerGroups: [] }, usageLimit: 1000, usedCount: 234, startsAt: '2024-06-01', endsAt: '2024-08-31', createdAt: '2024-05-15T10:00:00Z' },
  { id: 'disc-2', name: 'Free Shipping', code: 'FREESHIP', type: 'free_shipping', value: 0, status: 'active', conditions: { minPurchase: { amount: 75, currency: 'USD' }, minQuantity: 0, applicableCategories: [], applicableProducts: [], customerGroups: [] }, usageLimit: 0, usedCount: 567, startsAt: '2024-01-01', endsAt: '2024-12-31', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'disc-3', name: 'Buy 2 Get 1', code: 'B2G1', type: 'buy_x_get_y', value: 33, status: 'scheduled', conditions: { minPurchase: { amount: 0, currency: 'USD' }, minQuantity: 3, applicableCategories: ['Widgets'], applicableProducts: [], customerGroups: [] }, usageLimit: 500, usedCount: 0, startsAt: '2024-04-01', endsAt: '2024-04-30', createdAt: '2024-03-15T10:00:00Z' },
];

export const discountsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Discount>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockDiscounts];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.code.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Discount>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockDiscounts.find(e => e.id === id);
    if (!item) throw new Error('Discount not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Discount>): Promise<ApiResponse<Discount>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockDiscounts[0], id: 'disc-' + Date.now(), ...data } as Discount;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Discount>): Promise<ApiResponse<Discount>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockDiscounts.find(e => e.id === id);
    if (!existing) throw new Error('Discount not found');
    return { success: true, data: { ...existing, ...data } as Discount };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
