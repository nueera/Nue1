'use client';
// Items Types — Zoho Inventory
import type { Money } from '../../../types/finance-common';

export type ItemType = 'inventory' | 'non_inventory' | 'service' | 'digital';
export interface ItemVariant {
  name: string;
  sku: string;
  price: Money;
  stockOnHand: number;
}
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  type: ItemType;
  category: string;
  unit: string;
  sellingPrice: Money;
  costPrice: Money;
  stockOnHand: number;
  reorderLevel: number;
  warehouseId: string;
  warehouseName: string;
  image: string;
  isActive: boolean;
  variants: ItemVariant[];
  createdAt: string;
  updatedAt: string;
}
export type Item = InventoryItem;
