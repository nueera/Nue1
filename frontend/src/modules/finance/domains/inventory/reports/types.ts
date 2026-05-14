// @ts-nocheck
'use client';
// Reports Types — Zoho Inventory
import type { Money } from '../../../types/finance-common';

export type InventoryReportType = 'stock_summary' | 'stock_movement' | 'sales_by_item' | 'purchase_by_item' | 'warehouse_summary';
export interface InventoryReport {
  id: string;
  type: InventoryReportType;
  period: string;
  startDate: string;
  endDate: string;
  totalStockValue: Money;
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  topSellingItems: { itemId: string; itemName: string; quantity: number; revenue: Money }[];
  warehouseSummary: { warehouseId: string; warehouseName: string; stockValue: Money; itemCount: number }[];
}
