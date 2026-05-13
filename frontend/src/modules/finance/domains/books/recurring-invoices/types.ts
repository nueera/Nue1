import type { Money, LineItem, InvoiceStatus } from '../../../types/finance-common';

export type RecurringFrequency = 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly' | 'semi-annually' | 'annually';
export type RecurringStatus = 'active' | 'paused' | 'expired';

export interface RecurringInvoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  status: RecurringStatus;
  frequency: RecurringFrequency;
  startDate: string;
  endDate?: string;
  nextInvoiceDate: string;
  lastInvoiceDate?: string;
  subject: string;
  notes: string;
  terms: string;
  lineItems: LineItem[];
  subTotal: Money;
  taxTotal: Money;
  total: Money;
  currency: string;
  invoicesGenerated: number;
  autoSend: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RecurringSchedule {
  id: string;
  recurringInvoiceId: string;
  frequency: RecurringFrequency;
  startDate: string;
  endDate?: string;
  nextRun: string;
  lastRun?: string;
  isActive: boolean;
}

export interface RecurringInvoiceList {
  recurringInvoices: RecurringInvoice[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
