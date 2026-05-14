// @ts-nocheck
import type { Money, Address, LineItem, OrderStatus } from '../../../types/finance-common';

export interface SalesOrder {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  date: string;
  shipmentDate: string;
  notes: string;
  terms: string;
  billingAddress: Address;
  shippingAddress: Address;
  lineItems: SalesOrderLineItem[];
  subTotal: Money;
  taxTotal: Money;
  discount: Money;
  total: Money;
  currency: string;
  salesPerson: string;
  estimateId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SalesOrderLineItem extends LineItem {
  salesOrderId: string;
  fulfilledQuantity: number;
}

export interface SalesOrderList {
  salesOrders: SalesOrder[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
