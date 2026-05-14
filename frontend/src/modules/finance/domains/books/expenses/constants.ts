// @ts-nocheck
import type { ExpenseCategory, ExpenseStatus } from './types';
import { EXPENSE_STATUS_CONFIG } from '../../../constants/finance-common';

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: 'travel', label: 'Travel' },
  { value: 'meals', label: 'Meals & Entertainment' },
  { value: 'office-supplies', label: 'Office Supplies' },
  { value: 'software', label: 'Software & Subscriptions' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'rent', label: 'Rent' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'other', label: 'Other' },
];

export const EXPENSE_STATUSES = Object.entries(EXPENSE_STATUS_CONFIG).map(([value, cfg]) => ({
  value: value as ExpenseStatus, label: cfg.label, color: cfg.color,
}));

export const EXPENSE_TABLE_COLUMNS = [
  { key: 'number', label: 'Expense #', visible: true, sortable: true },
  { key: 'employeeName', label: 'Employee', visible: true, sortable: true },
  { key: 'categoryName', label: 'Category', visible: true, sortable: true },
  { key: 'date', label: 'Date', visible: true, sortable: true },
  { key: 'amount', label: 'Amount', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;
