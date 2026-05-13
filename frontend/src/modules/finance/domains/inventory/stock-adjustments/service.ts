'use client';
// StockAdjustments Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { StockAdjustment } from './types';

const mockAdjustments: StockAdjustment[] = [
  { id: 'sa-1', adjustmentNumber: 'SA-001', date: '2024-02-15', reason: 'damaged', type: 'quantity', description: '5 units damaged in transit', itemId: 'item-1', itemName: 'Widget Pro', warehouseId: 'wh-1', warehouseName: 'Main Warehouse', quantityBefore: 255, quantityAfter: 250, quantityChange: -5, valueChange: { amount: -60, currency: 'USD' }, createdAt: '2024-02-15T10:00:00Z' },
  { id: 'sa-2', adjustmentNumber: 'SA-002', date: '2024-02-18', reason: 'stocktake', type: 'quantity', description: 'Annual stocktake correction', itemId: 'item-2', itemName: 'Gadget Plus', warehouseId: 'wh-1', warehouseName: 'Main Warehouse', quantityBefore: 100, quantityAfter: 97, quantityChange: -3, valueChange: { amount: -75, currency: 'USD' }, createdAt: '2024-02-18T10:00:00Z' },
  { id: 'sa-3', adjustmentNumber: 'SA-003', date: '2024-02-20', reason: 'found', type: 'quantity', description: 'Found misplaced items', itemId: 'item-1', itemName: 'Widget Pro', warehouseId: 'wh-1', warehouseName: 'Main Warehouse', quantityBefore: 250, quantityAfter: 260, quantityChange: 10, valueChange: { amount: 120, currency: 'USD' }, createdAt: '2024-02-20T10:00:00Z' },
];

export const stockAdjustmentsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<StockAdjustment>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockAdjustments];
    if (params?.search) data = data.filter(e => e.itemName.toLowerCase().includes(params.search!.toLowerCase()) || e.adjustmentNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<StockAdjustment>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockAdjustments.find(e => e.id === id);
    if (!item) throw new Error('Stock adjustment not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<StockAdjustment>): Promise<ApiResponse<StockAdjustment>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockAdjustments[0], id: 'sa-' + Date.now(), ...data } as StockAdjustment;
    return { success: true, data: item };
  },
};
