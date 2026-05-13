'use client';
// Subscriptions Types — Zoho Billing
import type { Money, SubscriptionStatus } from '../../../types/finance-common';
import type { PlanFrequency } from '../plans/types';

export interface SubscriptionChange {
  fromPlanId: string;
  toPlanId: string;
  effectiveDate: string;
  prorate: boolean;
}
export interface SubscriptionCancel {
  cancelAt: string;
  reason: string;
  refundType: 'none' | 'prorated' | 'full';
}
export interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  planId: string;
  planName: string;
  amount: Money;
  frequency: PlanFrequency;
  startDate: string;
  nextBilling: string;
  status: SubscriptionStatus;
  trialEnd: string;
  couponId: string;
  addOns: { addonId: string; quantity: number }[];
  pendingChange: SubscriptionChange | null;
  createdAt: string;
}
