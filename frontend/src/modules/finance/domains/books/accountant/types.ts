// @ts-nocheck
// ============================================================================
// Accountant — Types (Chart of Accounts)
// ============================================================================

import type { Money } from '../../../types/finance-common';

export type AccountType = 'asset' | 'liability' | 'equity' | 'income' | 'expense';
export type AccountNature = 'debit' | 'credit';

export interface ChartOfAccount {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  nature: AccountNature;
  parentId?: string;
  description: string;
  isActive: boolean;
  isSystem: boolean;
  balance: Money;
  subAccounts: ChartOfAccount[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  number: string;
  date: string;
  description: string;
  lines: JournalEntryLine[];
  status: 'draft' | 'posted' | 'reversed';
  reference?: string;
  postedAt?: string;
  createdAt: string;
}

export interface JournalEntryLine {
  id: string;
  journalEntryId: string;
  accountId: string;
  accountName: string;
  debit: Money;
  credit: Money;
  description?: string;
}

export interface ChartOfAccountList {
  accounts: ChartOfAccount[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
