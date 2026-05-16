import type { Expense, ExpenseCategory, ExpenseStatus } from './types';
import { EXPENSE_CATEGORIES, EXPENSE_STATUSES } from './constants';

export function getExpenseCategoryLabel(category: ExpenseCategory): string {
  return EXPENSE_CATEGORIES.find(c => c.value === category)?.label ?? category;
}

export function getExpenseStatusLabel(status: ExpenseStatus): string {
  return EXPENSE_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getExpenseStatusColor(status: ExpenseStatus): string {
  const colorMap: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    blue: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  };
  const cfg = EXPENSE_STATUSES.find(s => s.value === status);
  const color = cfg?.color ?? 'gray';
  return colorMap[color] ?? '';
}

export function hasReceipt(expense: Expense): boolean { return expense.receipt !== null; }
