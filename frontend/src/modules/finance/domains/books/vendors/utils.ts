// @ts-nocheck
// ============================================================================
// Vendors — Utils
// ============================================================================

import type { Vendor, VendorStatus } from './types';
import { VENDOR_STATUSES } from './constants';
import { formatMoney } from '../../../utils/currency';

export function getVendorStatusLabel(status: VendorStatus): string {
  return VENDOR_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getVendorStatusColor(status: VendorStatus): string {
  const colorMap: Record<VendorStatus, string> = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    inactive: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    'on-hold': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  };
  return colorMap[status] ?? '';
}

export function formatVendorPayable(vendor: Vendor): string {
  return formatMoney(vendor.outstandingBalance);
}

export function isVendorActive(vendor: Vendor): boolean {
  return vendor.status === 'active';
}

export function getPrimaryContact(vendor: Vendor): Vendor['contactPersons'][number] | undefined {
  return vendor.contactPersons.find(c => c.isPrimary);
}
