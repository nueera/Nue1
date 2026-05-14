// @ts-nocheck
'use client';
// Coupons Types — Zoho Billing
import type { Money } from '../../../types/finance-common';

export type CouponDiscountType = 'percentage' | 'flat';
export type CouponStatus = 'active' | 'expired' | 'disabled';
export interface CouponRule {
  minPurchaseAmount: Money;
  maxRedemptionsPerCustomer: number;
  applicableProductIds: string[];
  applicablePlanIds: string[];
  firstTimeOnly: boolean;
}
export interface Coupon {
  id: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  maxRedemptions: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: CouponStatus;
  rules: CouponRule;
  createdAt: string;
}
