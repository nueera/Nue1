// @ts-nocheck
// ============================================================================
// Vendors — Constants
// ============================================================================

import type { VendorStatus } from './types';

export const VENDOR_STATUSES: { value: VendorStatus; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
  { value: 'on-hold', label: 'On Hold', color: 'amber' },
];

export const VENDOR_STATUS_FILTERS = ['All', 'active', 'inactive', 'on-hold'] as const;

export const VENDOR_DETAIL_TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'transactions', label: 'Transactions' },
  { value: 'addresses', label: 'Addresses' },
  { value: 'contacts', label: 'Contact Persons' },
  { value: 'notes', label: 'Notes' },
] as const;

export const VENDOR_TABLE_COLUMNS = [
  { key: 'name', label: 'Vendor', visible: true, sortable: true },
  { key: 'email', label: 'Email', visible: true, sortable: true },
  { key: 'company', label: 'Company', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
  { key: 'outstandingBalance', label: 'Payable', visible: true, sortable: true },
  { key: 'totalPurchases', label: 'Purchases', visible: true, sortable: true },
  { key: 'createdAt', label: 'Created', visible: false, sortable: true },
] as const;
