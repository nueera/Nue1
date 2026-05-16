// ============================================================================
// Accountant — Utils
// ============================================================================

import type { AccountType, ChartOfAccount } from './types';
import { ACCOUNT_TYPES, ACCOUNT_TYPE_RANGES } from './constants';

export function getAccountTypeLabel(type: AccountType): string {
  return ACCOUNT_TYPES.find(t => t.value === type)?.label ?? type;
}

export function getAccountTypeColor(type: AccountType): string {
  const map: Record<AccountType, string> = {
    asset: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
    liability: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    equity: 'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800',
    income: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    expense: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  };
  return map[type] ?? '';
}

export function getNextAccountCode(type: AccountType, existingCodes: string[]): string {
  const range = ACCOUNT_TYPE_RANGES[type];
  const used = existingCodes.map(Number).filter(n => n >= range.min && n <= range.max);
  const next = used.length > 0 ? Math.max(...used) + 1 : range.min;
  return String(next);
}

export function flattenAccounts(accounts: ChartOfAccount[]): ChartOfAccount[] {
  const result: ChartOfAccount[] = [];
  const walk = (list: ChartOfAccount[]) => {
    for (const acc of list) {
      result.push(acc);
      if (acc.subAccounts?.length) walk(acc.subAccounts);
    }
  };
  walk(accounts);
  return result;
}

export function getAccountDepth(account: ChartOfAccount, allAccounts: ChartOfAccount[]): number {
  let depth = 0;
  let current = account;
  while (current.parentId) {
    depth++;
    current = allAccounts.find(a => a.id === current.parentId) ?? current;
    if (current.id === account.parentId && depth > 10) break;
  }
  return depth;
}
