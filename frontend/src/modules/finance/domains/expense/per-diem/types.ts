// @ts-nocheck
'use client';
// PerDiem Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export interface PerDiemRate {
  destination: string;
  rate: Money;
  mealsIncluded: boolean;
  accommodationIncluded: boolean;
}
export interface PerDiem {
  id: string;
  employeeId: string;
  employeeName: string;
  tripId: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: number;
  dailyRate: Money;
  totalAmount: Money;
  rates: PerDiemRate[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
}
