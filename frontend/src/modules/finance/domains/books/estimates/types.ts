// @ts-nocheck
// ============================================================================
// Estimates — Types
// ============================================================================

import type { Money, Address, LineItem, EstimateStatus } from '../../../types/finance-common';

export interface Estimate {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  status: EstimateStatus;
  date: string;
  expiryDate: string;
  subject: string;
  notes: string;
  terms: string;
  billingAddress: Address;
  shippingAddress: Address;
  lineItems: EstimateLineItem[];
  subTotal: Money;
  taxTotal: Money;
  discount: Money;
  total: Money;
  currency: string;
  salesPerson: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EstimateLineItem extends LineItem {
  estimateId: string;
  discount?: Money;
}

export interface EstimateList {
  estimates: Estimate[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
