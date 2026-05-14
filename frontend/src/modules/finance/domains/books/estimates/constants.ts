// @ts-nocheck
import type { EstimateStatus } from '../../../types';
import { ESTIMATE_STATUS_CONFIG } from '../../../constants/finance-common';

export const ESTIMATE_STATUSES = Object.entries(ESTIMATE_STATUS_CONFIG).map(([value, cfg]) => ({
  value: value as EstimateStatus,
  label: cfg.label,
  color: cfg.color,
}));

export const ESTIMATE_TABLE_COLUMNS = [
  { key: 'number', label: 'Estimate #', visible: true, sortable: true },
  { key: 'customerName', label: 'Customer', visible: true, sortable: true },
  { key: 'date', label: 'Date', visible: true, sortable: true },
  { key: 'expiryDate', label: 'Expiry', visible: true, sortable: true },
  { key: 'total', label: 'Amount', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;
