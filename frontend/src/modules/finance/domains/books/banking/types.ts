// ============================================================================
// Banking — Types
// ============================================================================

import type { Money, PaymentStatus } from '../../../types/finance-common';

export type BankAccountType = 'checking' | 'savings' | 'credit' | 'cash';

export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  routingNumber?: string;
  bankName: string;
  currency: string;
  balance: Money;
  type: BankAccountType;
  status: 'active' | 'inactive' | 'frozen';
  lastSyncedAt?: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BankTransaction {
  id: string;
  bankAccountId: string;
  date: string;
  description: string;
  amount: Money;
  type: 'credit' | 'debit';
  status: PaymentStatus;
  category?: string;
  reference?: string;
  reconciled: boolean;
  matchedTransactionId?: string;
  createdAt: string;
}

export interface BankAccountList {
  bankAccounts: BankAccount[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface ReconciliationMatch {
  bankTransactionId: string;
  bookTransactionId: string;
  matchScore: number;
  matchType: 'exact' | 'suggested';
}
