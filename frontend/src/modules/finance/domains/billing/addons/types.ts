// @ts-nocheck
'use client';
// Addons Types — Zoho Billing
import type { Money } from '../../../types/finance-common';

export type AddonType = 'recurring' | 'one_time';
export type AddonStatus = 'active' | 'archived';
export interface Addon {
  id: string;
  name: string;
  code: string;
  type: AddonType;
  price: Money;
  productIds: string[];
  status: AddonStatus;
  description: string;
  createdAt: string;
}
