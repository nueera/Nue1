// @ts-nocheck
// ============================================================================
// Customers — Types
// ============================================================================

import type { Money, Address, InvoiceStatus, PaymentStatus } from '../../../types/finance-common';

// ---------------------------------------------------------------------------
// Customer Status
// ---------------------------------------------------------------------------

export type CustomerStatus = 'active' | 'inactive' | 'on-hold';

// ---------------------------------------------------------------------------
// Core Types
// ---------------------------------------------------------------------------

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  displayName: string;
  status: CustomerStatus;
  currency: string;
  paymentTerms: string;
  billingAddress: Address;
  shippingAddress: Address;
  contactPersons: CustomerContact[];
  notes: string;
  taxId: string;
  taxExempt: boolean;
  openingBalance: Money;
  outstandingBalance: Money;
  overdueBalance: Money;
  totalRevenue: Money;
  website: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerContact {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  designation: string;
  isPrimary: boolean;
}

export interface CustomerAddress {
  id: string;
  customerId: string;
  type: 'billing' | 'shipping';
  attention: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface CustomerTransaction {
  id: string;
  customerId: string;
  date: string;
  type: 'invoice' | 'payment' | 'credit-note' | 'refund';
  number: string;
  amount: Money;
  balance: Money;
  status: InvoiceStatus | PaymentStatus;
  dueDate?: string;
  reference?: string;
}

export interface CustomerList {
  customers: Customer[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface CustomerStatement {
  customerId: string;
  from: string;
  to: string;
  openingBalance: Money;
  closingBalance: Money;
  transactions: CustomerTransaction[];
}
