// @ts-nocheck
import type { Money, Address, LineItem, InvoiceStatus } from '../../../types/finance-common';

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
  subject: string;
  notes: string;
  terms: string;
  billingAddress: Address;
  shippingAddress: Address;
  lineItems: InvoiceLineItem[];
  subTotal: Money;
  taxTotal: Money;
  discount: Money;
  shippingCharges: Money;
  total: Money;
  balance: Money;
  currency: string;
  salesPerson: string;
  estimateId?: string;
  salesOrderId?: string;
  tags: string[];
  sentAt?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceLineItem extends LineItem {
  invoiceId: string;
}

export interface InvoiceList {
  invoices: Invoice[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
