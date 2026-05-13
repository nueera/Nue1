'use client';
// Plans Types — Zoho Billing
import type { Money } from '../../../types/finance-common';

export type PlanFrequency = 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
export type PlanStatus = 'active' | 'archived';
export interface PricingTier {
  from: number;
  to: number | null;
  price: Money;
}
export interface Plan {
  id: string;
  name: string;
  productId: string;
  productName: string;
  price: Money;
  frequency: PlanFrequency;
  trialDays: number;
  setupFee: Money;
  features: string[];
  status: PlanStatus;
  subscriberCount: number;
  pricingTiers: PricingTier[];
  createdAt: string;
}
