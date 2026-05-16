'use client';
// Transactions Types — Zoho Checkout
import type { Money, PaymentStatus } from '../../../types/finance-common';

export type TransactionType = 'payment' | 'refund' | 'dispute' | 'chargeback';
export interface RefundDetail {
  refundId: string;
  amount: Money;
  reason: string;
  status: 'pending' | 'processed' | 'failed';
  initiatedAt: string;
}
export interface DisputeDetail {
  disputeId: string;
  reason: string;
  status: 'open' | 'won' | 'lost' | 'resolved';
  amount: Money;
  openedAt: string;
  resolvedAt: string;
}
export interface Transaction {
  id: string;
  transactionId: string;
  type: TransactionType;
  customerId: string;
  customerName: string;
  amount: Money;
  currency: string;
  method: string;
  gateway: string;
  status: PaymentStatus;
  paymentPageId: string;
  paymentLinkId: string;
  refund: RefundDetail | null;
  dispute: DisputeDetail | null;
  createdAt: string;
}
export type CheckoutTransaction = Transaction;
