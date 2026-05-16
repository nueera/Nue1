'use client';
// SalesOrders Types — Zoho Inventory
import type { Money, LineItem } from '../../../types/finance-common';

export type SalesOrderStatus = 'draft' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
export interface FulfillmentItem {
  itemId: string;
  itemName: string;
  quantityOrdered: number;
  quantityPacked: number;
  quantityShipped: number;
}
export interface InvSalesOrder {
  id: string;
  salesOrderNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  shipmentDate: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: SalesOrderStatus;
  fulfillmentItems: FulfillmentItem[];
  notes: string;
  createdAt: string;
}
export type SalesOrder = InvSalesOrder;
