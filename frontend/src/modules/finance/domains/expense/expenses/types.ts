'use client';
// Expenses Types — Zoho Expense
import type { Money, ExpenseStatus, TaxRate } from '../../../types/finance-common';

export interface ExpenseSplit {
  percentage: number;
  projectId: string;
  projectName: string;
}
export interface Expense {
  id: string;
  expenseNumber: string;
  categoryId: string;
  categoryName: string;
  amount: Money;
  tax: TaxRate | null;
  date: string;
  merchant: string;
  description: string;
  status: ExpenseStatus;
  receiptUrl: string;
  receiptFileName: string;
  hasReceipt: boolean;
  splits: ExpenseSplit[];
  reportId: string;
  createdAt: string;
}
