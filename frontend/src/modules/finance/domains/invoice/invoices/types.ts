'use client';
// Invoices Types — Zoho Invoice
import type { Money, LineItem, InvoiceStatus } from '../../../types/finance-common';

export interface InvoiceInvoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
  paymentTermsId: string;
  notes: string;
  templateId: string;
  lastPaymentDate: string;
  balance: Money;
  autoRemind: boolean;
  remindDaysBefore: number;
  remindFrequency: 'once' | 'weekly' | 'daily';
  createdAt: string;
  updatedAt: string;
}
export type Invoice = InvoiceInvoice;
export interface InvoicePayment { id: string; invoiceId: string; amount: { amount: number; currency: string }; date: string; method: string; reference: string; }
