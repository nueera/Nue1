// @ts-nocheck
import type { Money, LineItem } from '../../../types/finance-common';

export type CreditNoteStatus = 'open' | 'applied' | 'void';

export interface CreditNote {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  status: CreditNoteStatus;
  date: string;
  reason: string;
  notes: string;
  lineItems: CreditNoteLineItem[];
  subTotal: Money;
  taxTotal: Money;
  total: Money;
  currency: string;
  invoiceId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreditNoteLineItem extends LineItem {
  creditNoteId: string;
}

export interface CreditNoteList {
  creditNotes: CreditNote[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
