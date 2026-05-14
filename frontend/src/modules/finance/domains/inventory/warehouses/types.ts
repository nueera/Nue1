// @ts-nocheck
'use client';
// Warehouses Types — Zoho Inventory
import type { Money, Address } from '../../../types/finance-common';

export interface WarehouseZone {
  name: string;
  type: 'storage' | 'picking' | 'packing' | 'shipping';
  capacity: number;
  usedCapacity: number;
}
export interface Warehouse {
  id: string;
  name: string;
  address: Address;
  isDefault: boolean;
  stockValue: Money;
  itemCount: number;
  capacity: number;
  usedCapacity: number;
  manager: string;
  managerName: string;
  isActive: boolean;
  zones: WarehouseZone[];
  createdAt: string;
}
