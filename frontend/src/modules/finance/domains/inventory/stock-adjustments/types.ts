// @ts-nocheck
'use client';
// StockAdjustments Types — Zoho Inventory
import type { Money } from '../../../types/finance-common';

export type AdjustmentType = 'quantity' | 'value';
export type AdjustmentReason = 'damaged' | 'lost' | 'found' | 'stocktake' | 'write_off' | 'other';
export interface StockAdjustment {
  id: string;
  adjustmentNumber: string;
  date: string;
  reason: AdjustmentReason;
  type: AdjustmentType;
  description: string;
  itemId: string;
  itemName: string;
  warehouseId: string;
  warehouseName: string;
  quantityBefore: number;
  quantityAfter: number;
  quantityChange: number;
  valueChange: Money;
  createdAt: string;
}
