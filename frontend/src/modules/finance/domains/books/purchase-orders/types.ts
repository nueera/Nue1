import type { Money, Address, LineItem, OrderStatus } from '../../../types';

export interface PurchaseOrder {
  id: string;
  number: string;
  vendorId: string;
  vendorName: string;
  status: OrderStatus;
  date: string;
  deliveryDate: string;
  notes: string;
  terms: string;
  billingAddress: Address;
  shippingAddress: Address;
  lineItems: PurchaseOrderLineItem[];
  subTotal: Money;
  taxTotal: Money;
  total: Money;
  currency: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderLineItem extends LineItem {
  purchaseOrderId: string;
  receivedQuantity: number;
}

export interface PurchaseOrderList {
  purchaseOrders: PurchaseOrder[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
