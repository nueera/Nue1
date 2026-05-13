'use client';
// PaymentPages Types — Zoho Checkout
import type { Money } from '../../../types/finance-common';

export type PaymentPageStatus = 'active' | 'inactive' | 'draft';
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
  required: boolean;
  options: string[];
}
export interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  logo: string;
  fontFamily: string;
  borderRadius: string;
}
export interface PaymentPage {
  id: string;
  name: string;
  slug: string;
  url: string;
  planId: string;
  planName: string;
  amount: Money;
  status: PaymentPageStatus;
  fields: FormField[];
  theme: ThemeConfig;
  successUrl: string;
  failureUrl: string;
  visitCount: number;
  conversionCount: number;
  createdAt: string;
}
