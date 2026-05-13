import type { BillStatus } from '../../../types';
import { BILL_STATUS_CONFIG } from '../../../constants/finance-common';

export const BILL_STATUSES = Object.entries(BILL_STATUS_CONFIG).map(([value, cfg]) => ({
  value: value as BillStatus, label: cfg.label, color: cfg.color,
}));

export const BILL_TABLE_COLUMNS = [
  { key: 'number', label: 'Bill #', visible: true, sortable: true },
  { key: 'vendorName', label: 'Vendor', visible: true, sortable: true },
  { key: 'date', label: 'Date', visible: true, sortable: true },
  { key: 'dueDate', label: 'Due Date', visible: true, sortable: true },
  { key: 'total', label: 'Amount', visible: true, sortable: true },
  { key: 'balance', label: 'Balance', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;
