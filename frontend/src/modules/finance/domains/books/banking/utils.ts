// @ts-nocheck
// ============================================================================
// Banking — Utils
// ============================================================================

import type { BankAccount, BankAccountType } from './types';
import { BANK_ACCOUNT_TYPES } from './constants';

export function getBankAccountTypeLabel(type: BankAccountType): string {
  return BANK_ACCOUNT_TYPES.find(t => t.value === type)?.label ?? type;
}

export function getBankAccountStatusColor(status: BankAccount['status']): string {
  const map: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    inactive: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    frozen: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  };
  return map[status] ?? '';
}

export function isCreditAccount(account: BankAccount): boolean {
  return account.type === 'credit';
}

export function getEffectiveBalance(account: BankAccount): number {
  return isCreditAccount(account) ? -account.balance.amount : account.balance.amount;
}
