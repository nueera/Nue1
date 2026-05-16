'use client';
// Transfers Types — Zoho Inventory
import type { Money } from '../../../types/finance-common';

export type TransferStatus = 'draft' | 'in_transit' | 'received' | 'cancelled';
export interface TransferItem {
  itemId: string;
  itemName: string;
  quantity: number;
}
export interface StockTransfer {
  id: string;
  transferNumber: string;
  fromWarehouseId: string;
  fromWarehouseName: string;
  toWarehouseId: string;
  toWarehouseName: string;
  date: string;
  expectedArrival: string;
  status: TransferStatus;
  items: TransferItem[];
  notes: string;
  createdAt: string;
}
export type Transfer = StockTransfer;
