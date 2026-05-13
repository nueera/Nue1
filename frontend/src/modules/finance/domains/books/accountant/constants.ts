// ============================================================================
// Accountant — Constants
// ============================================================================

import type { AccountType } from './types';

export const ACCOUNT_TYPES: { value: AccountType; label: string; color: string }[] = [
  { value: 'asset', label: 'Assets', color: 'blue' },
  { value: 'liability', label: 'Liabilities', color: 'red' },
  { value: 'equity', label: 'Equity', color: 'purple' },
  { value: 'income', label: 'Income', color: 'green' },
  { value: 'expense', label: 'Expenses', color: 'amber' },
];

export const ACCOUNT_TYPE_RANGES: Record<AccountType, { min: number; max: number }> = {
  asset: { min: 1000, max: 1999 },
  liability: { min: 2000, max: 2999 },
  equity: { min: 3000, max: 3999 },
  income: { min: 4000, max: 4999 },
  expense: { min: 5000, max: 5999 },
};

export const JOURNAL_ENTRY_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'gray' },
  { value: 'posted', label: 'Posted', color: 'green' },
  { value: 'reversed', label: 'Reversed', color: 'amber' },
] as const;

export const CHART_OF_ACCOUNTS_TABLE_COLUMNS = [
  { key: 'code', label: 'Code', visible: true, sortable: true },
  { key: 'name', label: 'Account Name', visible: true, sortable: true },
  { key: 'type', label: 'Type', visible: true, sortable: true },
  { key: 'balance', label: 'Balance', visible: true, sortable: true },
  { key: 'isActive', label: 'Active', visible: true, sortable: true },
] as const;
