// @ts-nocheck
import type { Money } from '../../types/finance-common';

export interface MockTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: Money;
  description: string;
  date: string;
  category: string;
  accountId: string;
  reference: string;
}

export const mockTransactions: MockTransaction[] = [
  {
    id: 'txn-001',
    type: 'income',
    amount: { amount: 10844.47, currency: 'USD' },
    description: 'Payment received from Apex Industries - INV-2024-0001',
    date: '2024-06-25T09:15:00Z',
    category: 'Invoice Payment',
    accountId: 'bank-001',
    reference: 'ACH-8847291035',
  },
  {
    id: 'txn-002',
    type: 'expense',
    amount: { amount: 4250.0, currency: 'USD' },
    description: 'Cloud infrastructure monthly charges - CloudHosting Solutions',
    date: '2024-07-01T00:00:00Z',
    category: 'Cloud Services',
    accountId: 'bank-001',
    reference: 'BILL-2024-0002',
  },
  {
    id: 'txn-003',
    type: 'income',
    amount: { amount: 9500.0, currency: 'USD' },
    description: 'Partial payment from Pinnacle Logistics',
    date: '2024-06-20T14:30:00Z',
    category: 'Invoice Payment',
    accountId: 'bank-001',
    reference: 'CHK-44891',
  },
  {
    id: 'txn-004',
    type: 'expense',
    amount: { amount: 67850.0, currency: 'USD' },
    description: 'July mid-month payroll run',
    date: '2024-07-15T00:00:00Z',
    category: 'Payroll',
    accountId: 'bank-002',
    reference: 'PR-2024-07-001',
  },
  {
    id: 'txn-005',
    type: 'expense',
    amount: { amount: 16654.75, currency: 'USD' },
    description: 'Server hardware and networking equipment - TechGard Hardware',
    date: '2024-07-08T11:00:00Z',
    category: 'Equipment',
    accountId: 'bank-001',
    reference: 'BILL-2024-0004',
  },
  {
    id: 'txn-006',
    type: 'income',
    amount: { amount: 3000.0, currency: 'USD' },
    description: 'Payment from Nova Health Corp - wire transfer',
    date: '2024-07-08T16:45:00Z',
    category: 'Invoice Payment',
    accountId: 'bank-001',
    reference: 'WT-20240708-NHC',
  },
  {
    id: 'txn-007',
    type: 'expense',
    amount: { amount: 487.6, currency: 'USD' },
    description: 'Team lunch meeting - The Capital Grille',
    date: '2024-07-01T12:30:00Z',
    category: 'Meals & Entertainment',
    accountId: 'bank-004',
    reference: 'EXP-2024-001',
  },
  {
    id: 'txn-008',
    type: 'income',
    amount: { amount: 2499.0, currency: 'USD' },
    description: 'Enterprise Suite subscription - Apex Industries',
    date: '2024-07-15T00:00:00Z',
    category: 'Subscription Revenue',
    accountId: 'bank-001',
    reference: 'SUB-2024-001',
  },
];
