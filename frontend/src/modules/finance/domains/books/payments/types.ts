// @ts-nocheck
import type { Money, PaymentStatus } from '../../../types/finance-common';

export type PaymentMethod = 'cash' | 'check' | 'bank-transfer' | 'credit-card' | 'online' | 'other';

export interface Payment {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  vendorId?: string;
  vendorName?: string;
  amount: Money;
  date: string;
  paymentMethod: PaymentMethod;
  reference: string;
  status: PaymentStatus;
  notes: string;
  allocations: PaymentAllocation[];
  bankAccountId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaymentAllocation {
  id: string;
  paymentId: string;
  invoiceId: string;
  invoiceNumber: string;
  amount: Money;
  allocatedAt: string;
}

export interface PaymentList {
  payments: Payment[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
