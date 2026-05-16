'use client';
// Reports Service — Zoho Inventory
import type { ApiResponse } from '../../../types/finance-common';
import type { InventoryReport } from './types';

const mockReport: InventoryReport = {
  id: 'irpt-1',
  type: 'stock_summary',
  period: '2024-Q1',
  startDate: '2024-01-01',
  endDate: '2024-03-31',
  totalStockValue: { amount: 430000, currency: 'USD' },
  totalItems: 350,
  lowStockItems: 12,
  outOfStockItems: 3,
  topSellingItems: [
    { itemId: 'item-1', itemName: 'Widget Pro', quantity: 500, revenue: { amount: 14995, currency: 'USD' } },
    { itemId: 'item-2', itemName: 'Gadget Plus', quantity: 200, revenue: { amount: 11998, currency: 'USD' } },
  ],
  warehouseSummary: [
    { warehouseId: 'wh-1', warehouseName: 'Main Warehouse', stockValue: { amount: 250000, currency: 'USD' }, itemCount: 350 },
    { warehouseId: 'wh-2', warehouseName: 'East Coast Warehouse', stockValue: { amount: 180000, currency: 'USD' }, itemCount: 200 },
  ],
};

export const inventoryReportsService = {
  get: async (): Promise<ApiResponse<InventoryReport>> => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, data: mockReport };
  },
  getReorderReport: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  getProfitabilityReport: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  getStockSummary: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  getSalesReport: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  getPurchaseReport: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  getInventoryValuation: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
};

/** @deprecated Use inventoryReportsService */
export const reportsService = inventoryReportsService;
