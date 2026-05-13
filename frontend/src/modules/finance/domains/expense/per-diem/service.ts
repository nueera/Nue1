'use client';
// PerDiem Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { PerDiem } from './types';

const mockPerDiems: PerDiem[] = [
  { id: 'pd-1', employeeId: 'u1', employeeName: 'Alice Smith', tripId: 'trip-1', destination: 'New York, NY', startDate: '2024-03-10', endDate: '2024-03-13', days: 3, dailyRate: { amount: 200, currency: 'USD' }, totalAmount: { amount: 600, currency: 'USD' }, rates: [{ destination: 'New York, NY', rate: { amount: 200, currency: 'USD' }, mealsIncluded: true, accommodationIncluded: false }], status: 'submitted', createdAt: '2024-03-10T10:00:00Z' },
  { id: 'pd-2', employeeId: 'u2', employeeName: 'Bob Jones', tripId: 'trip-2', destination: 'Chicago, IL', startDate: '2024-02-15', endDate: '2024-02-16', days: 1, dailyRate: { amount: 150, currency: 'USD' }, totalAmount: { amount: 150, currency: 'USD' }, rates: [{ destination: 'Chicago, IL', rate: { amount: 150, currency: 'USD' }, mealsIncluded: true, accommodationIncluded: true }], status: 'approved', createdAt: '2024-02-15T10:00:00Z' },
];

export const perDiemService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<PerDiem>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPerDiems];
    if (params?.search) data = data.filter(e => e.destination.toLowerCase().includes(params.search!.toLowerCase()) || e.employeeName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<PerDiem>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPerDiems.find(e => e.id === id);
    if (!item) throw new Error('Per diem not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<PerDiem>): Promise<ApiResponse<PerDiem>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPerDiems[0], id: 'pd-' + Date.now(), ...data } as PerDiem;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<PerDiem>): Promise<ApiResponse<PerDiem>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPerDiems.find(e => e.id === id);
    if (!existing) throw new Error('Per diem not found');
    return { success: true, data: { ...existing, ...data } as PerDiem };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
