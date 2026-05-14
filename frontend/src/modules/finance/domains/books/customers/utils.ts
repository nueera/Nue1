// @ts-nocheck
// ============================================================================
// Customers — Utils
// ============================================================================

import type { Customer, CustomerStatus } from './types';
import { CUSTOMER_STATUSES } from './constants';
import { formatMoney } from '../../../utils/currency';

export function getCustomerStatusLabel(status: CustomerStatus): string {
  return CUSTOMER_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getCustomerStatusColor(status: CustomerStatus): string {
  const colorMap: Record<CustomerStatus, string> = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    inactive: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    'on-hold': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  };
  return colorMap[status] ?? '';
}

export function formatCustomerOutstanding(customer: Customer): string {
  return formatMoney(customer.outstandingBalance);
}

export function formatCustomerRevenue(customer: Customer): string {
  return formatMoney(customer.totalRevenue);
}

export function isCustomerActive(customer: Customer): boolean {
  return customer.status === 'active';
}

export function hasOverdueBalance(customer: Customer): boolean {
  return customer.overdueBalance.amount > 0;
}

export function getCustomerDisplayName(customer: Customer): string {
  return customer.displayName || customer.name;
}

export function getPrimaryContact(customer: Customer): Customer['contactPersons'][number] | undefined {
  return customer.contactPersons.find(c => c.isPrimary);
}

export function computeCustomerRisk(customer: Customer): 'low' | 'medium' | 'high' {
  if (customer.overdueBalance.amount > 0) return 'high';
  if (customer.outstandingBalance.amount > customer.totalRevenue.amount * 0.3) return 'medium';
  return 'low';
}
