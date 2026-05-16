'use client';
// Estimates Types — Zoho Invoice
import type { Money, LineItem, EstimateStatus } from '../../../types/finance-common';

export type EstimateType = 'detailed' | 'itemized' | 'service';
export interface InvoiceEstimate {
  id: string;
  estimateNumber: string;
  customerId: string;
  customerName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: EstimateStatus;
  date: string;
  expiryDate: string;
  type: EstimateType;
  notes: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
}
export type Estimate = InvoiceEstimate;
