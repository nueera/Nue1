// @ts-nocheck
'use client';
// Orders Types — Zoho Commerce
import type { Money, Address, OrderStatus } from '../../../types/finance-common';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: Money;
  total: Money;
}
export interface FulfillmentInfo {
  carrier: string;
  trackingNumber: string;
  shippedDate: string;
  deliveredDate: string;
}
export interface CommerceOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: Money;
  shipping: Money;
  tax: Money;
  total: Money;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  fulfillment: FulfillmentInfo | null;
  notes: string;
  createdAt: string;
}
