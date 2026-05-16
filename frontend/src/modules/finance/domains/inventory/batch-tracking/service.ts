'use client';
// BatchTracking Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Batch, SerialNumber } from './types';

const mockBatches: Batch[] = [
  { id: 'batch-1', batchNumber: 'B-2024-001', itemId: 'item-1', itemName: 'Widget Pro', warehouseId: 'wh-1', warehouseName: 'Main Warehouse', quantity: 100, remainingQuantity: 65, manufactureDate: '2024-01-01', expiryDate: '2025-01-01', status: 'in_stock', costPrice: { amount: 12, currency: 'USD' }, notes: '', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'batch-2', batchNumber: 'B-2024-002', itemId: 'item-1', itemName: 'Widget Pro', warehouseId: 'wh-1', warehouseName: 'Main Warehouse', quantity: 50, remainingQuantity: 0, manufactureDate: '2023-06-01', expiryDate: '2023-12-01', status: 'expired', costPrice: { amount: 11, currency: 'USD' }, notes: 'Expired batch', createdAt: '2023-06-01T10:00:00Z' },
  { id: 'batch-3', batchNumber: 'B-2024-003', itemId: 'item-2', itemName: 'Gadget Plus', warehouseId: 'wh-1', warehouseName: 'Main Warehouse', quantity: 80, remainingQuantity: 80, manufactureDate: '2024-02-01', expiryDate: '2025-02-01', status: 'in_stock', costPrice: { amount: 25, currency: 'USD' }, notes: '', createdAt: '2024-02-01T10:00:00Z' },
];

export const batchTrackingService = {
  getAllBatches: async (params?: PaginatedRequest): Promise<PaginatedResponse<Batch>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockBatches];
    if (params?.search) data = data.filter(e => e.batchNumber.toLowerCase().includes(params.search!.toLowerCase()) || e.itemName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getBatchById: async (id: string): Promise<ApiResponse<Batch>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockBatches.find(e => e.id === id);
    if (!item) throw new Error('Batch not found');
    return { success: true, data: item };
  },
  createBatch: async (data: Partial<Batch>): Promise<ApiResponse<Batch>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockBatches[0], id: 'batch-' + Date.now(), ...data } as Batch;
    return { success: true, data: item };
  },
  getSerialNumbers: async (itemId: string): Promise<ApiResponse<SerialNumber[]>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: [{ id: 'sn-1', serialNumber: 'SN-001', itemId, itemName: 'Widget Pro', warehouseId: 'wh-1', status: 'in_stock', purchaseDate: '2024-01-01', saleDate: '' }] };
  },
  getExpiringBatches: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
};
