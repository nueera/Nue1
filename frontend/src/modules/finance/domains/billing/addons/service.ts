// @ts-nocheck
'use client';
// Addons Service — Zoho Billing
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Addon } from './types';

const mockAddons: Addon[] = [
  { id: 'add-1', name: 'Extra Storage', code: 'EX-STOR', type: 'recurring', price: { amount: 9.99, currency: 'USD' }, productIds: ['bp-1', 'bp-2'], status: 'active', description: 'Additional 50GB storage', createdAt: '2024-01-10T10:00:00Z' },
  { id: 'add-2', name: 'Priority Support', code: 'PRI-SUP', type: 'recurring', price: { amount: 29, currency: 'USD' }, productIds: ['bp-1'], status: 'active', description: '24/7 priority support access', createdAt: '2024-01-10T10:00:00Z' },
  { id: 'add-3', name: 'Onboarding Package', code: 'ONB-PKG', type: 'one_time', price: { amount: 499, currency: 'USD' }, productIds: ['bp-2'], status: 'active', description: 'Dedicated onboarding session', createdAt: '2024-02-01T10:00:00Z' },
];

export const addonsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Addon>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockAddons];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.code.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Addon>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockAddons.find(e => e.id === id);
    if (!item) throw new Error('Addon not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Addon>): Promise<ApiResponse<Addon>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockAddons[0], id: 'add-' + Date.now(), ...data } as Addon;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Addon>): Promise<ApiResponse<Addon>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockAddons.find(e => e.id === id);
    if (!existing) throw new Error('Addon not found');
    return { success: true, data: { ...existing, ...data } as Addon };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
