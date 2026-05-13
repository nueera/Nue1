// ============================================================================
// Vendors — Types
// ============================================================================

import type { Money, Address, BillStatus, PaymentStatus } from '../../../types/finance-common';

export type VendorStatus = 'active' | 'inactive' | 'on-hold';

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  displayName: string;
  status: VendorStatus;
  currency: string;
  paymentTerms: string;
  billingAddress: Address;
  shippingAddress: Address;
  contactPersons: VendorContact[];
  notes: string;
  taxId: string;
  taxExempt: boolean;
  openingBalance: Money;
  outstandingBalance: Money;
  totalPurchases: Money;
  website: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VendorContact {
  id: string;
  vendorId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  designation: string;
  isPrimary: boolean;
}

export interface VendorTransaction {
  id: string;
  vendorId: string;
  date: string;
  type: 'bill' | 'payment' | 'credit-note' | 'refund';
  number: string;
  amount: Money;
  balance: Money;
  status: BillStatus | PaymentStatus;
  dueDate?: string;
  reference?: string;
}

export interface VendorList {
  vendors: Vendor[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
