import type { Money, Address, LineItem, BillStatus } from '../../../types';

export interface Bill {
  id: string;
  number: string;
  vendorId: string;
  vendorName: string;
  status: BillStatus;
  date: string;
  dueDate: string;
  notes: string;
  terms: string;
  billingAddress: Address;
  lineItems: BillLineItem[];
  subTotal: Money;
  taxTotal: Money;
  total: Money;
  balance: Money;
  currency: string;
  purchaseOrderId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BillLineItem extends LineItem {
  billId: string;
}

export interface BillList {
  bills: Bill[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
