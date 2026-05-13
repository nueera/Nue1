'use client';
// PurchaseOrders Types — Zoho Inventory
import type { Money, LineItem } from '../../../types/finance-common';

export type POStatus = 'draft' | 'issued' | 'partial' | 'received' | 'cancelled';
export interface InvPurchaseOrder {
  id: string;
  purchaseOrderNumber: string;
  vendorId: string;
  vendorName: string;
  date: string;
  expectedDelivery: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: POStatus;
  notes: string;
  createdAt: string;
}
