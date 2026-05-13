import type { CreditNote, CreditNoteStatus } from './types';
import { CREDIT_NOTE_STATUSES } from './constants';

export function getCreditNoteStatusLabel(status: CreditNoteStatus): string {
  return CREDIT_NOTE_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getCreditNoteStatusColor(status: CreditNoteStatus): string {
  const map: Record<CreditNoteStatus, string> = {
    open: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
    applied: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    void: 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-600',
  };
  return map[status] ?? '';
}

export function isOpen(cn: CreditNote): boolean { return cn.status === 'open'; }
