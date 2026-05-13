'use client';
// BatchTracking Types — Zoho Inventory
import type { Money } from '../../../types/finance-common';

export type BatchStatus = 'in_stock' | 'expired' | 'damaged' | 'sold';
export interface Batch {
  id: string;
  batchNumber: string;
  itemId: string;
  itemName: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number;
  remainingQuantity: number;
  manufactureDate: string;
  expiryDate: string;
  status: BatchStatus;
  costPrice: Money;
  notes: string;
  createdAt: string;
}
export interface SerialNumber {
  id: string;
  serialNumber: string;
  itemId: string;
  itemName: string;
  warehouseId: string;
  status: 'in_stock' | 'sold' | 'defective';
  purchaseDate: string;
  saleDate: string;
}
