// @ts-nocheck
'use client';
// Packages Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Package } from './types';

const mockPackages: Package[] = [
  { id: 'pkg-1', packageNumber: 'PKG-001', salesOrderId: 'so-2', customerId: 'c2', customerName: 'Beta LLC', dimensions: { length: 30, width: 20, height: 15, unit: 'cm', weight: 2.5, weightUnit: 'kg' }, status: 'shipped', trackingNumber: '1Z999AA10123456784', carrier: 'UPS', shippingCost: { amount: 25, currency: 'USD' }, date: '2024-02-15', createdAt: '2024-02-15T10:00:00Z' },
  { id: 'pkg-2', packageNumber: 'PKG-002', salesOrderId: 'so-1', customerId: 'c1', customerName: 'Acme Corp', dimensions: { length: 50, width: 40, height: 30, unit: 'cm', weight: 8, weightUnit: 'kg' }, status: 'packed', trackingNumber: '', carrier: 'FedEx', shippingCost: { amount: 45, currency: 'USD' }, date: '2024-02-18', createdAt: '2024-02-18T10:00:00Z' },
];

export const packagesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Package>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPackages];
    if (params?.search) data = data.filter(e => e.packageNumber.toLowerCase().includes(params.search!.toLowerCase()) || e.customerName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Package>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPackages.find(e => e.id === id);
    if (!item) throw new Error('Package not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Package>): Promise<ApiResponse<Package>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPackages[0], id: 'pkg-' + Date.now(), ...data } as Package;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Package>): Promise<ApiResponse<Package>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPackages.find(e => e.id === id);
    if (!existing) throw new Error('Package not found');
    return { success: true, data: { ...existing, ...data } as Package };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
