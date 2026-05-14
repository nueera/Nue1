// @ts-nocheck
import type { CreditNoteStatus } from './types';

export const CREDIT_NOTE_STATUSES: { value: CreditNoteStatus; label: string; color: string }[] = [
  { value: 'open', label: 'Open', color: 'blue' },
  { value: 'applied', label: 'Applied', color: 'green' },
  { value: 'void', label: 'Void', color: 'slate' },
];

export const CREDIT_NOTE_TABLE_COLUMNS = [
  { key: 'number', label: 'CN #', visible: true, sortable: true },
  { key: 'customerName', label: 'Customer', visible: true, sortable: true },
  { key: 'date', label: 'Date', visible: true, sortable: true },
  { key: 'total', label: 'Amount', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;
