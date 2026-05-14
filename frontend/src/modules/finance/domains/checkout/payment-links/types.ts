// @ts-nocheck
'use client';
// PaymentLinks Types — Zoho Checkout
import type { Money } from '../../../types/finance-common';

export type PaymentLinkStatus = 'active' | 'expired' | 'used' | 'cancelled';
export interface PaymentLink {
  id: string;
  name: string;
  url: string;
  amount: Money;
  description: string;
  status: PaymentLinkStatus;
  expiryDate: string;
  maxUses: number;
  usedCount: number;
  customerId: string;
  customerName: string;
  createdAt: string;
}
