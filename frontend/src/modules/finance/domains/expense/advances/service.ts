// @ts-nocheck
'use client';
// Advances Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Advance } from './types';

const mockAdvances: Advance[] = [
  { id: 'adv-1', advanceNumber: 'ADV-001', employeeId: 'u1', employeeName: 'Alice Smith', amount: { amount: 2000, currency: 'USD' }, utilized: { amount: 1200, currency: 'USD' }, returned: { amount: 0, currency: 'USD' }, balance: { amount: 800, currency: 'USD' }, status: 'partially_utilized', purpose: 'Conference travel', date: '2024-02-01', createdAt: '2024-02-01T10:00:00Z' },
  { id: 'adv-2', advanceNumber: 'ADV-002', employeeId: 'u2', employeeName: 'Bob Jones', amount: { amount: 500, currency: 'USD' }, utilized: { amount: 500, currency: 'USD' }, returned: { amount: 0, currency: 'USD' }, balance: { amount: 0, currency: 'USD' }, status: 'utilized', purpose: 'Office supplies', date: '2024-01-15', createdAt: '2024-01-15T10:00:00Z' },
  { id: 'adv-3', advanceNumber: 'ADV-003', employeeId: 'u1', employeeName: 'Alice Smith', amount: { amount: 1500, currency: 'USD' }, utilized: { amount: 0, currency: 'USD' }, returned: { amount: 0, currency: 'USD' }, balance: { amount: 1500, currency: 'USD' }, status: 'pending', purpose: 'Client visit', date: '2024-03-01', createdAt: '2024-02-25T10:00:00Z' },
];

export const advancesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Advance>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockAdvances];
    if (params?.search) data = data.filter(e => e.employeeName.toLowerCase().includes(params.search!.toLowerCase()) || e.purpose.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Advance>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockAdvances.find(e => e.id === id);
    if (!item) throw new Error('Advance not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Advance>): Promise<ApiResponse<Advance>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockAdvances[0], id: 'adv-' + Date.now(), ...data } as Advance;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Advance>): Promise<ApiResponse<Advance>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockAdvances.find(e => e.id === id);
    if (!existing) throw new Error('Advance not found');
    return { success: true, data: { ...existing, ...data } as Advance };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
