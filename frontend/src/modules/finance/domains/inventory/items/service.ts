// @ts-nocheck
'use client';
// Items Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { InventoryItem } from './types';

const mockItems: InventoryItem[] = [
  { id: 'item-1', name: 'Widget Pro', sku: 'WGT-PRO-001', type: 'inventory', category: 'Widgets', unit: 'pcs', sellingPrice: { amount: 29.99, currency: 'USD' }, costPrice: { amount: 12, currency: 'USD' }, stockOnHand: 250, reorderLevel: 50, warehouseId: 'wh-1', warehouseName: 'Main Warehouse', image: '', isActive: true, variants: [{ name: 'Standard', sku: 'WGT-PRO-001-S', price: { amount: 29.99, currency: 'USD' }, stockOnHand: 150 }, { name: 'Premium', sku: 'WGT-PRO-001-P', price: { amount: 49.99, currency: 'USD' }, stockOnHand: 100 }], createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:00:00Z' },
  { id: 'item-2', name: 'Gadget Plus', sku: 'GDT-PLS-001', type: 'inventory', category: 'Gadgets', unit: 'pcs', sellingPrice: { amount: 59.99, currency: 'USD' }, costPrice: { amount: 25, currency: 'USD' }, stockOnHand: 100, reorderLevel: 20, warehouseId: 'wh-1', warehouseName: 'Main Warehouse', image: '', isActive: true, variants: [], createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z' },
  { id: 'item-3', name: 'Consulting Hour', sku: 'SVC-CON-001', type: 'service', category: 'Services', unit: 'hour', sellingPrice: { amount: 150, currency: 'USD' }, costPrice: { amount: 75, currency: 'USD' }, stockOnHand: 0, reorderLevel: 0, warehouseId: '', warehouseName: '', image: '', isActive: true, variants: [], createdAt: '2024-02-01T10:00:00Z', updatedAt: '2024-02-01T10:00:00Z' },
];

export const inventoryItemsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<InventoryItem>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockItems];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.sku.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<InventoryItem>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockItems.find(e => e.id === id);
    if (!item) throw new Error('Item not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<InventoryItem>): Promise<ApiResponse<InventoryItem>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockItems[0], id: 'item-' + Date.now(), ...data } as InventoryItem;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<InventoryItem>): Promise<ApiResponse<InventoryItem>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockItems.find(e => e.id === id);
    if (!existing) throw new Error('Item not found');
    return { success: true, data: { ...existing, ...data } as InventoryItem };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
