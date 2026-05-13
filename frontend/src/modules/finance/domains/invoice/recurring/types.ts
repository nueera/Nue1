'use client';
// Recurring Types — Zoho Invoice
import type { Money } from '../../../types/finance-common';

export type RecurringFrequency = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
export type RecurringStatus = 'active' | 'paused' | 'expired' | 'cancelled';
export interface RecurringInvoice {
  id: string;
  profileName: string;
  customerId: string;
  customerName: string;
  frequency: RecurringFrequency;
  startDate: string;
  endDate: string;
  nextInvoiceDate: string;
  lastInvoiceDate: string;
  amount: Money;
  status: RecurringStatus;
  invoicesGenerated: number;
  createdAt: string;
}
