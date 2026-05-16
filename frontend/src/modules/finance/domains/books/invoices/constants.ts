import type { InvoiceStatus } from '../../../types';
import { INVOICE_STATUS_CONFIG } from '../../../constants/finance-common';

export const INVOICE_STATUSES = Object.entries(INVOICE_STATUS_CONFIG).map(([value, cfg]) => ({
  value: value as InvoiceStatus, label: cfg.label, color: cfg.color,
}));

export const INVOICE_TABLE_COLUMNS = [
  { key: 'number', label: 'Invoice #', visible: true, sortable: true },
  { key: 'customerName', label: 'Customer', visible: true, sortable: true },
  { key: 'date', label: 'Date', visible: true, sortable: true },
  { key: 'dueDate', label: 'Due Date', visible: true, sortable: true },
  { key: 'total', label: 'Amount', visible: true, sortable: true },
  { key: 'balance', label: 'Balance', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;
