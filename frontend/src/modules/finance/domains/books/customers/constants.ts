// @ts-nocheck
// ============================================================================
// Customers — Constants
// ============================================================================

import type { CustomerStatus } from './types';

export const CUSTOMER_STATUSES: { value: CustomerStatus; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
  { value: 'on-hold', label: 'On Hold', color: 'amber' },
];

export const CUSTOMER_STATUS_FILTERS = ['All', 'active', 'inactive', 'on-hold'] as const;

export const CUSTOMER_DETAIL_TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'transactions', label: 'Transactions' },
  { value: 'addresses', label: 'Addresses' },
  { value: 'contacts', label: 'Contact Persons' },
  { value: 'notes', label: 'Notes' },
] as const;

export const CUSTOMER_FIELDS_CONFIG = {
  name: { label: 'Customer Name', required: true, sortable: true, filterable: true },
  email: { label: 'Email', required: true, sortable: true, filterable: true },
  phone: { label: 'Phone', required: false, sortable: true, filterable: false },
  company: { label: 'Company', required: false, sortable: true, filterable: true },
  status: { label: 'Status', required: true, sortable: true, filterable: true },
  currency: { label: 'Currency', required: false, sortable: true, filterable: true },
  paymentTerms: { label: 'Payment Terms', required: false, sortable: false, filterable: true },
  outstandingBalance: { label: 'Outstanding', required: false, sortable: true, filterable: false },
} as const;

export const CUSTOMER_TABLE_COLUMNS = [
  { key: 'name', label: 'Name', visible: true, sortable: true },
  { key: 'email', label: 'Email', visible: true, sortable: true },
  { key: 'company', label: 'Company', visible: true, sortable: true },
  { key: 'phone', label: 'Phone', visible: false, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
  { key: 'outstandingBalance', label: 'Outstanding', visible: true, sortable: true },
  { key: 'totalRevenue', label: 'Revenue', visible: true, sortable: true },
  { key: 'createdAt', label: 'Created', visible: false, sortable: true },
] as const;
