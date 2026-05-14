// @ts-nocheck
'use client';
// Products Types — Zoho Billing
import type { Money } from '../../../types/finance-common';

export type BillingProductStatus = 'active' | 'archived';
export interface BillingProduct {
  id: string;
  name: string;
  description: string;
  status: BillingProductStatus;
  productType: 'goods' | 'service' | 'digital';
  sku: string;
  price: Money;
  createdAt: string;
  updatedAt: string;
}
