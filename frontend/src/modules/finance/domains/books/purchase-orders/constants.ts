import type { OrderStatus } from '../../../types';
import { ORDER_STATUS_CONFIG } from '../../../constants/finance-common';

export const PO_STATUSES = Object.entries(ORDER_STATUS_CONFIG).map(([value, cfg]) => ({
  value: value as OrderStatus, label: cfg.label, color: cfg.color,
}));

export const PO_TABLE_COLUMNS = [
  { key: 'number', label: 'PO #', visible: true, sortable: true },
  { key: 'vendorName', label: 'Vendor', visible: true, sortable: true },
  { key: 'date', label: 'Date', visible: true, sortable: true },
  { key: 'total', label: 'Amount', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;
