// ============================================================================
// Banking — Constants
// ============================================================================

import type { BankAccountType } from './types';

export const BANK_ACCOUNT_TYPES: { value: BankAccountType; label: string }[] = [
  { value: 'checking', label: 'Checking' },
  { value: 'savings', label: 'Savings' },
  { value: 'credit', label: 'Credit Card' },
  { value: 'cash', label: 'Cash' },
];

export const BANK_ACCOUNT_STATUSES = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
  { value: 'frozen', label: 'Frozen', color: 'amber' },
] as const;

export const BANK_ACCOUNT_TABLE_COLUMNS = [
  { key: 'name', label: 'Account', visible: true, sortable: true },
  { key: 'bankName', label: 'Bank', visible: true, sortable: true },
  { key: 'accountNumber', label: 'Account #', visible: true, sortable: false },
  { key: 'type', label: 'Type', visible: true, sortable: true },
  { key: 'balance', label: 'Balance', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;

export const TRANSACTION_CATEGORIES = [
  'Sales Revenue', 'Service Revenue', 'Interest Income', 'Refund',
  'Rent', 'Utilities', 'Payroll', 'Office Supplies', 'Insurance',
  'Marketing', 'Software', 'Travel', 'Meals', 'Professional Services',
  'Loan Payment', 'Transfer', 'Uncategorized',
] as const;
