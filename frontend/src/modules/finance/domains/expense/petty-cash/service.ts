// @ts-nocheck
'use client';
// PettyCash Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { PettyCash } from './types';

const mockPettyCash: PettyCash[] = [
  { id: 'pc-1', name: 'Office Petty Cash', custodian: 'Alice Smith', custodianId: 'u1', balance: { amount: 150, currency: 'USD' }, initialAmount: { amount: 500, currency: 'USD' }, status: 'active', lastReplenished: '2024-02-01', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'pc-2', name: 'Warehouse Cash', custodian: 'Bob Jones', custodianId: 'u2', balance: { amount: 75, currency: 'USD' }, initialAmount: { amount: 300, currency: 'USD' }, status: 'active', lastReplenished: '2024-01-20', createdAt: '2024-01-01T10:00:00Z' },
];

export const pettyCashService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<PettyCash>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPettyCash];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<PettyCash>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPettyCash.find(e => e.id === id);
    if (!item) throw new Error('Petty cash not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<PettyCash>): Promise<ApiResponse<PettyCash>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPettyCash[0], id: 'pc-' + Date.now(), ...data } as PettyCash;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<PettyCash>): Promise<ApiResponse<PettyCash>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPettyCash.find(e => e.id === id);
    if (!existing) throw new Error('Petty cash not found');
    return { success: true, data: { ...existing, ...data } as PettyCash };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
