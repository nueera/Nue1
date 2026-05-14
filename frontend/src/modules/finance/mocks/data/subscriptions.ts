// @ts-nocheck
import type { Money, SubscriptionStatus } from '../../types/finance-common';

export interface MockSubscription {
  id: string;
  customerId: string;
  customerName: string;
  planName: string;
  amount: Money;
  frequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
  startDate: string;
  nextBilling: string;
  status: SubscriptionStatus;
}

export const mockSubscriptions: MockSubscription[] = [
  {
    id: 'sub-001',
    customerId: 'cust-001',
    customerName: 'Apex Industries',
    planName: 'Enterprise Suite',
    amount: { amount: 2499.0, currency: 'USD' },
    frequency: 'monthly',
    startDate: '2024-01-15T00:00:00Z',
    nextBilling: '2024-08-15T00:00:00Z',
    status: 'live',
  },
  {
    id: 'sub-002',
    customerId: 'cust-002',
    customerName: 'Nova Health Corp',
    planName: 'Professional Plan',
    amount: { amount: 899.0, currency: 'USD' },
    frequency: 'monthly',
    startDate: '2024-02-01T00:00:00Z',
    nextBilling: '2024-08-01T00:00:00Z',
    status: 'live',
  },
  {
    id: 'sub-003',
    customerId: 'cust-004',
    customerName: 'BrightWave Technologies',
    planName: 'Business Starter',
    amount: { amount: 499.0, currency: 'USD' },
    frequency: 'monthly',
    startDate: '2024-07-01T00:00:00Z',
    nextBilling: '2024-08-01T00:00:00Z',
    status: 'trial',
  },
  {
    id: 'sub-004',
    customerId: 'cust-003',
    customerName: 'Pinnacle Logistics',
    planName: 'Enterprise Suite',
    amount: { amount: 7497.0, currency: 'USD' },
    frequency: 'quarterly',
    startDate: '2024-03-01T00:00:00Z',
    nextBilling: '2024-09-01T00:00:00Z',
    status: 'paused',
  },
  {
    id: 'sub-005',
    customerId: 'cust-006',
    customerName: 'Summit Dynamics',
    planName: 'Professional Plan',
    amount: { amount: 2697.0, currency: 'USD' },
    frequency: 'quarterly',
    startDate: '2024-04-02T00:00:00Z',
    nextBilling: '2024-10-02T00:00:00Z',
    status: 'live',
  },
  {
    id: 'sub-006',
    customerId: 'cust-008',
    customerName: 'Ironside Consulting',
    planName: 'Annual Enterprise',
    amount: { amount: 23988.0, currency: 'USD' },
    frequency: 'annually',
    startDate: '2025-01-01T00:00:00Z',
    nextBilling: '2025-01-01T00:00:00Z',
    status: 'future',
  },
];
