// @ts-nocheck
import type { Money, PaymentStatus } from '../../types/finance-common';

export interface MockPayment {
  id: string;
  paymentNumber: string;
  customerId: string;
  customerName: string;
  amount: Money;
  date: string;
  method: 'credit_card' | 'bank_transfer' | 'check' | 'cash' | 'wire_transfer';
  reference: string;
  status: PaymentStatus;
}

export const mockPayments: MockPayment[] = [
  {
    id: 'pay-001',
    paymentNumber: 'PAY-2024-0001',
    customerId: 'cust-001',
    customerName: 'Apex Industries',
    amount: { amount: 10844.47, currency: 'USD' },
    date: '2024-06-25T09:15:00Z',
    method: 'bank_transfer',
    reference: 'ACH-8847291035',
    status: 'completed',
  },
  {
    id: 'pay-002',
    paymentNumber: 'PAY-2024-0002',
    customerId: 'cust-003',
    customerName: 'Pinnacle Logistics',
    amount: { amount: 9500.0, currency: 'USD' },
    date: '2024-06-20T14:30:00Z',
    method: 'check',
    reference: 'CHK-44891',
    status: 'completed',
  },
  {
    id: 'pay-003',
    paymentNumber: 'PAY-2024-0003',
    customerId: 'cust-004',
    customerName: 'BrightWave Technologies',
    amount: { amount: 5600.0, currency: 'USD' },
    date: '2024-07-10T11:00:00Z',
    method: 'credit_card',
    reference: 'CC-TXN-778234',
    status: 'pending',
  },
  {
    id: 'pay-004',
    paymentNumber: 'PAY-2024-0004',
    customerId: 'cust-002',
    customerName: 'Nova Health Corp',
    amount: { amount: 3000.0, currency: 'USD' },
    date: '2024-07-08T16:45:00Z',
    method: 'wire_transfer',
    reference: 'WT-20240708-NHC',
    status: 'completed',
  },
  {
    id: 'pay-005',
    paymentNumber: 'PAY-2024-0005',
    customerId: 'cust-006',
    customerName: 'Summit Dynamics',
    amount: { amount: 12000.0, currency: 'USD' },
    date: '2024-07-12T10:20:00Z',
    method: 'bank_transfer',
    reference: 'ACH-9923847102',
    status: 'failed',
  },
  {
    id: 'pay-006',
    paymentNumber: 'PAY-2024-0006',
    customerId: 'cust-005',
    customerName: 'GreenLeaf Partners',
    amount: { amount: 4500.0, currency: 'USD' },
    date: '2024-07-05T08:00:00Z',
    method: 'credit_card',
    reference: 'CC-TXN-445891',
    status: 'refunded',
  },
];
