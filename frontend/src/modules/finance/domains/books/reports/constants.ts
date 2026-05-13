// ============================================================================
// Reports — Constants
// ============================================================================

import type { ReportType, ReportFormat } from './types';

export const REPORT_TYPES: { value: ReportType; label: string; category: string }[] = [
  { value: 'profit-and-loss', label: 'Profit & Loss', category: 'Financial' },
  { value: 'balance-sheet', label: 'Balance Sheet', category: 'Financial' },
  { value: 'cash-flow', label: 'Cash Flow', category: 'Financial' },
  { value: 'trial-balance', label: 'Trial Balance', category: 'Financial' },
  { value: 'aged-receivables', label: 'Aged Receivables', category: 'Receivables' },
  { value: 'aged-payables', label: 'Aged Payables', category: 'Payables' },
  { value: 'sales-by-customer', label: 'Sales by Customer', category: 'Sales' },
  { value: 'purchases-by-vendor', label: 'Purchases by Vendor', category: 'Purchases' },
  { value: 'expense-by-category', label: 'Expense by Category', category: 'Expenses' },
  { value: 'tax-summary', label: 'Tax Summary', category: 'Tax' },
  { value: 'project-profitability', label: 'Project Profitability', category: 'Projects' },
  { value: 'budget-vs-actual', label: 'Budget vs Actual', category: 'Budget' },
];

export const REPORT_FORMATS: { value: ReportFormat; label: string }[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'csv', label: 'CSV' },
  { value: 'xlsx', label: 'Excel' },
];

export const REPORT_CATEGORIES = ['Financial', 'Receivables', 'Payables', 'Sales', 'Purchases', 'Expenses', 'Tax', 'Projects', 'Budget'] as const;

export const REPORT_TABLE_COLUMNS = [
  { key: 'name', label: 'Report', visible: true, sortable: true },
  { key: 'type', label: 'Type', visible: true, sortable: true },
  { key: 'lastRunAt', label: 'Last Run', visible: true, sortable: true },
  { key: 'isScheduled', label: 'Scheduled', visible: true, sortable: false },
] as const;
