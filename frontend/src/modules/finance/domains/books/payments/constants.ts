import type { PaymentMethod, PaymentStatus } from './types';

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'check', label: 'Check' },
  { value: 'bank-transfer', label: 'Bank Transfer' },
  { value: 'credit-card', label: 'Credit Card' },
  { value: 'online', label: 'Online' },
  { value: 'other', label: 'Other' },
];

export const PAYMENT_STATUSES: { value: PaymentStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'amber' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'failed', label: 'Failed', color: 'red' },
  { value: 'refunded', label: 'Refunded', color: 'purple' },
];
