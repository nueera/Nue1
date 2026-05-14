// @ts-nocheck
import type { OrderStatus } from '../../../types';
import { ORDER_STATUS_CONFIG } from '../../../constants/finance-common';

export const SALES_ORDER_STATUSES = Object.entries(ORDER_STATUS_CONFIG).map(([value, cfg]) => ({
  value: value as OrderStatus, label: cfg.label, color: cfg.color,
}));

export const SALES_ORDER_TABLE_COLUMNS = [
  { key: 'number', label: 'SO #', visible: true, sortable: true },
  { key: 'customerName', label: 'Customer', visible: true, sortable: true },
  { key: 'date', label: 'Date', visible: true, sortable: true },
  { key: 'shipmentDate', label: 'Shipment', visible: true, sortable: true },
  { key: 'total', label: 'Amount', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;
