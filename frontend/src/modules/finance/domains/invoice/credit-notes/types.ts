// @ts-nocheck
'use client';
// CreditNotes Types — Zoho Invoice
import type { Money } from '../../../types/finance-common';

export type CreditNoteStatus = 'open' | 'closed' | 'void';
export interface CreditNote {
  id: string;
  creditNoteNumber: string;
  customerId: string;
  customerName: string;
  invoiceId: string;
  amount: Money;
  status: CreditNoteStatus;
  date: string;
  reason: string;
  reference: string;
  createdAt: string;
}
