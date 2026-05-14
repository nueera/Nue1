// @ts-nocheck
'use client';
// Warehouses Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Warehouse } from './types';

const mockWarehouses: Warehouse[] = [
  { id: 'wh-1', name: 'Main Warehouse', address: { street: '100 Industrial Blvd', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' }, isDefault: true, stockValue: { amount: 250000, currency: 'USD' }, itemCount: 350, capacity: 10000, usedCapacity: 7500, manager: 'u1', managerName: 'Alice Smith', isActive: true, zones: [{ name: 'Zone A', type: 'storage', capacity: 5000, usedCapacity: 3500 }, { name: 'Zone B', type: 'picking', capacity: 2000, usedCapacity: 1800 }, { name: 'Zone C', type: 'shipping', capacity: 3000, usedCapacity: 2200 }], createdAt: '2024-01-01T10:00:00Z' },
  { id: 'wh-2', name: 'East Coast Warehouse', address: { street: '200 Commerce Dr', city: 'New York', state: 'NY', zip: '10001', country: 'US' }, isDefault: false, stockValue: { amount: 180000, currency: 'USD' }, itemCount: 200, capacity: 8000, usedCapacity: 4500, manager: 'u2', managerName: 'Bob Jones', isActive: true, zones: [{ name: 'Zone A', type: 'storage', capacity: 4000, usedCapacity: 2500 }, { name: 'Zone B', type: 'packing', capacity: 4000, usedCapacity: 2000 }], createdAt: '2024-01-15T10:00:00Z' },
];

export const warehousesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Warehouse>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockWarehouses];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Warehouse>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockWarehouses.find(e => e.id === id);
    if (!item) throw new Error('Warehouse not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Warehouse>): Promise<ApiResponse<Warehouse>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockWarehouses[0], id: 'wh-' + Date.now(), ...data } as Warehouse;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Warehouse>): Promise<ApiResponse<Warehouse>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockWarehouses.find(e => e.id === id);
    if (!existing) throw new Error('Warehouse not found');
    return { success: true, data: { ...existing, ...data } as Warehouse };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
