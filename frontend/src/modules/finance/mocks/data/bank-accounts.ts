// @ts-nocheck
import type { Money } from '../../types/finance-common';

export interface MockBankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  balance: Money;
  currency: string;
  type: 'checking' | 'savings' | 'credit' | 'cash';
}

export const mockBankAccounts: MockBankAccount[] = [
  {
    id: 'bank-001',
    name: 'Operating Account',
    accountNumber: '****4821',
    bankName: 'Chase Bank',
    balance: { amount: 187450.32, currency: 'USD' },
    currency: 'USD',
    type: 'checking',
  },
  {
    id: 'bank-002',
    name: 'Payroll Account',
    accountNumber: '****7103',
    bankName: 'Bank of America',
    balance: { amount: 62500.0, currency: 'USD' },
    currency: 'USD',
    type: 'checking',
  },
  {
    id: 'bank-003',
    name: 'Business Savings',
    accountNumber: '****2290',
    bankName: 'Wells Fargo',
    balance: { amount: 312800.75, currency: 'USD' },
    currency: 'USD',
    type: 'savings',
  },
  {
    id: 'bank-004',
    name: 'Corporate Credit Card',
    accountNumber: '****5567',
    bankName: 'American Express',
    balance: { amount: -8340.2, currency: 'USD' },
    currency: 'USD',
    type: 'credit',
  },
];
