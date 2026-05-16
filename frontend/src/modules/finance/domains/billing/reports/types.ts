'use client';
// Reports Types — Zoho Billing
import type { Money } from '../../../types/finance-common';

export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
export interface BillingReport {
  id: string;
  period: ReportPeriod;
  startDate: string;
  endDate: string;
  mrr: Money;
  arr: Money;
  newSubscriptions: number;
  churnedSubscriptions: number;
  netNewMRR: Money;
  churnRate: number;
  totalRevenue: Money;
  outstandingAmount: Money;
}
