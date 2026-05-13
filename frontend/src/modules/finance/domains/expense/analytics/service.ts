'use client';
// Analytics Service — Zoho Expense
import type { ApiResponse } from '../../../types/finance-common';
import type { ExpenseAnalytics } from './types';

const mockAnalytics: ExpenseAnalytics = {
  id: 'analytics-1',
  period: '2024-Q1',
  totalExpenses: { amount: 125000, currency: 'USD' },
  approvedExpenses: { amount: 98000, currency: 'USD' },
  pendingExpenses: { amount: 15000, currency: 'USD' },
  rejectedExpenses: { amount: 5000, currency: 'USD' },
  reimbursedExpenses: { amount: 85000, currency: 'USD' },
  avgExpensePerEmployee: { amount: 2500, currency: 'USD' },
  topCategory: 'Travel',
  topCategoryAmount: { amount: 45000, currency: 'USD' },
  complianceRate: 94.5,
  policyViolationCount: 23,
  categoryBreakdown: [
    { category: 'Travel', amount: { amount: 45000, currency: 'USD' }, count: 180 },
    { category: 'Meals', amount: { amount: 28000, currency: 'USD' }, count: 420 },
    { category: 'Office Supplies', amount: { amount: 15000, currency: 'USD' }, count: 95 },
  ],
  monthlyTrend: [
    { month: '2024-01', amount: { amount: 38000, currency: 'USD' } },
    { month: '2024-02', amount: { amount: 42000, currency: 'USD' } },
    { month: '2024-03', amount: { amount: 45000, currency: 'USD' } },
  ],
};

export const expenseAnalyticsService = {
  get: async (): Promise<ApiResponse<ExpenseAnalytics>> => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, data: mockAnalytics };
  },
};
