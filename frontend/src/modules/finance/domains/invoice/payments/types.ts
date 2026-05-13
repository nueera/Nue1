'use client';
// Payments Types — Zoho Invoice
import type { Money, PaymentStatus } from '../../../types/finance-common';

export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'check' | 'cash' | 'wire_transfer' | 'paypal' | 'stripe';
export interface InvoicePayment {
  id: string;
  paymentNumber: string;
  customerId: string;
  customerName: string;
  invoiceId: string;
  amount: Money;
  date: string;
  method: PaymentMethod;
  reference: string;
  status: PaymentStatus;
  gateway: string;
  thankYouPage: string;
  thankYouMessage: string;
  sendThankYouEmail: boolean;
  createdAt: string;
}
