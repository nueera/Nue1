'use client';
// Mileage Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Mileage } from './types';

const mockMileages: Mileage[] = [
  { id: 'ml-1', employeeId: 'u1', employeeName: 'Alice Smith', date: '2024-02-10', distance: 45.2, distanceUnit: 'miles', rate: { amount: 0.67, currency: 'USD' }, amount: { amount: 30.28, currency: 'USD' }, route: [{ address: '123 Main St, SF', lat: 37.77, lng: -122.42 }, { address: '456 Market St, SF', lat: 37.79, lng: -122.40 }], fromAddress: '123 Main St, San Francisco', toAddress: '456 Market St, San Francisco', purpose: 'Client meeting', status: 'submitted', createdAt: '2024-02-10T10:00:00Z' },
  { id: 'ml-2', employeeId: 'u2', employeeName: 'Bob Jones', date: '2024-02-15', distance: 120, distanceUnit: 'miles', rate: { amount: 0.67, currency: 'USD' }, amount: { amount: 80.40, currency: 'USD' }, route: [{ address: 'SF Office', lat: 37.77, lng: -122.42 }, { address: 'San Jose Office', lat: 37.34, lng: -121.89 }], fromAddress: 'San Francisco Office', toAddress: 'San Jose Office', purpose: 'Office visit', status: 'approved', createdAt: '2024-02-15T10:00:00Z' },
];

export const mileageService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Mileage>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockMileages];
    if (params?.search) data = data.filter(e => e.purpose.toLowerCase().includes(params.search!.toLowerCase()) || e.employeeName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Mileage>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockMileages.find(e => e.id === id);
    if (!item) throw new Error('Mileage not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Mileage>): Promise<ApiResponse<Mileage>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockMileages[0], id: 'ml-' + Date.now(), ...data } as Mileage;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Mileage>): Promise<ApiResponse<Mileage>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockMileages.find(e => e.id === id);
    if (!existing) throw new Error('Mileage not found');
    return { success: true, data: { ...existing, ...data } as Mileage };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
