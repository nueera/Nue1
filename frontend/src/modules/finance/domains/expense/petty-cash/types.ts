'use client';
// PettyCash Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export type PettyCashStatus = 'active' | 'closed';
export interface PettyCash {
  id: string;
  name: string;
  custodian: string;
  custodianId: string;
  balance: Money;
  initialAmount: Money;
  status: PettyCashStatus;
  lastReplenished: string;
  createdAt: string;
}
