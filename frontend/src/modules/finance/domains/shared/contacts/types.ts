// @ts-nocheck
'use client';
// Contacts Types — Finance Shared
import type { Address } from '../../../types/finance-common';

export type ContactType = 'customer' | 'vendor' | 'both';
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: ContactType;
  company: string;
  address: Address;
  taxId: string;
  currency: string;
  paymentTerms: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
}
