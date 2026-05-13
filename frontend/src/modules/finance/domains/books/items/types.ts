// ============================================================================
// Items — Types
// ============================================================================

import type { Money, TaxRate } from '../../../types/finance-common';

export type ItemType = 'inventory' | 'service' | 'non-inventory' | 'bundle';
export type ItemStatus = 'active' | 'inactive' | 'archived';

export interface Item {
  id: string;
  name: string;
  sku: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  category: string;
  unit: string;
  rate: Money;
  cost: Money;
  tax: TaxRate;
  trackInventory: boolean;
  stockOnHand: number;
  reorderPoint: number;
  preferredVendor: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ItemGroup {
  id: string;
  name: string;
  description: string;
  items: { itemId: string; quantity: number }[];
  createdAt: string;
}

export interface InventoryItem extends Item {
  type: 'inventory';
  trackInventory: true;
  stockOnHand: number;
  reorderPoint: number;
  warehouse: string;
  aisle: string;
  bin: string;
}

export interface ServiceItem extends Item {
  type: 'service';
  trackInventory: false;
  duration?: number;
  durationUnit?: 'hours' | 'days' | 'weeks' | 'months';
}
