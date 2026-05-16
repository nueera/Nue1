'use client';
// Packages Types — Zoho Inventory
import type { Money } from '../../../types/finance-common';

export type PackageStatus = 'packed' | 'shipped' | 'delivered' | 'returned';
export interface PackageDimension {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
  weight: number;
  weightUnit: 'kg' | 'lb';
}
export interface Package {
  id: string;
  packageNumber: string;
  salesOrderId: string;
  customerId: string;
  customerName: string;
  dimensions: PackageDimension;
  status: PackageStatus;
  trackingNumber: string;
  carrier: string;
  shippingCost: Money;
  date: string;
  createdAt: string;
}
