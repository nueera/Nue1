'use client';
// Transfers Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { StockTransfer } from './types';

const mockTransfers: StockTransfer[] = [
  { id: 'xfr-1', transferNumber: 'XFR-001', fromWarehouseId: 'wh-1', fromWarehouseName: 'Main Warehouse', toWarehouseId: 'wh-2', toWarehouseName: 'East Coast Warehouse', date: '2024-02-15', expectedArrival: '2024-02-22', status: 'in_transit', items: [{ itemId: 'item-1', itemName: 'Widget Pro', quantity: 50 }], notes: 'Regular stock transfer', createdAt: '2024-02-15T10:00:00Z' },
  { id: 'xfr-2', transferNumber: 'XFR-002', fromWarehouseId: 'wh-2', fromWarehouseName: 'East Coast Warehouse', toWarehouseId: 'wh-1', toWarehouseName: 'Main Warehouse', date: '2024-02-20', expectedArrival: '2024-02-27', status: 'draft', items: [{ itemId: 'item-2', itemName: 'Gadget Plus', quantity: 25 }], notes: '', createdAt: '2024-02-20T10:00:00Z' },
];

export const transfersService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<StockTransfer>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockTransfers];
    if (params?.search) data = data.filter(e => e.transferNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<StockTransfer>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockTransfers.find(e => e.id === id);
    if (!item) throw new Error('Transfer not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<StockTransfer>): Promise<ApiResponse<StockTransfer>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockTransfers[0], id: 'xfr-' + Date.now(), ...data } as StockTransfer;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<StockTransfer>): Promise<ApiResponse<StockTransfer>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockTransfers.find(e => e.id === id);
    if (!existing) throw new Error('Transfer not found');
    return { success: true, data: { ...existing, ...data } as StockTransfer };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
