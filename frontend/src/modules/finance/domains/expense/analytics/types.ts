'use client';
// Analytics Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export interface ExpenseAnalytics {
  id: string;
  period: string;
  totalExpenses: Money;
  approvedExpenses: Money;
  pendingExpenses: Money;
  rejectedExpenses: Money;
  reimbursedExpenses: Money;
  avgExpensePerEmployee: Money;
  topCategory: string;
  topCategoryAmount: Money;
  complianceRate: number;
  policyViolationCount: number;
  categoryBreakdown: { category: string; amount: Money; count: number }[];
  monthlyTrend: { month: string; amount: Money }[];
}
