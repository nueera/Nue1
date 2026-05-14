// @ts-nocheck
'use client';
// Policies Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export type PolicyType = 'expense' | 'travel' | 'mileage' | 'per_diem';
export interface PolicyRule {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  value: string;
  message: string;
}
export interface Policy {
  id: string;
  name: string;
  type: PolicyType;
  description: string;
  rules: PolicyRule[];
  maxAmount: Money;
  requiresReceipt: boolean;
  receiptThreshold: Money;
  isActive: boolean;
  createdAt: string;
}
