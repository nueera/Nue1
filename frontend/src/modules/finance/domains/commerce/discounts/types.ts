// @ts-nocheck
'use client';
// Discounts Types — Zoho Commerce
import type { Money } from '../../../types/finance-common';

export type DiscountType = 'percentage' | 'fixed' | 'buy_x_get_y' | 'free_shipping';
export type DiscountStatus = 'active' | 'scheduled' | 'expired' | 'disabled';
export interface DiscountCondition {
  minPurchase: Money;
  minQuantity: number;
  applicableCategories: string[];
  applicableProducts: string[];
  customerGroups: string[];
}
export interface Discount {
  id: string;
  name: string;
  code: string;
  type: DiscountType;
  value: number;
  status: DiscountStatus;
  conditions: DiscountCondition;
  usageLimit: number;
  usedCount: number;
  startsAt: string;
  endsAt: string;
  createdAt: string;
}
