'use client';
// Advances Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export type AdvanceStatus = 'pending' | 'approved' | 'partially_utilized' | 'utilized' | 'returned';
export interface Advance {
  id: string;
  advanceNumber: string;
  employeeId: string;
  employeeName: string;
  amount: Money;
  utilized: Money;
  returned: Money;
  balance: Money;
  status: AdvanceStatus;
  purpose: string;
  date: string;
  createdAt: string;
}
