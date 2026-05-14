// @ts-nocheck
'use client';
// Dunning Types — Zoho Billing
import type { Money } from '../../../types/finance-common';

export type DunningActionType = 'send_reminder' | 'charge_late_fee' | 'suspend_subscription' | 'cancel_subscription';
export type DunningRuleStatus = 'active' | 'inactive';
export interface DunningAction {
  type: DunningActionType;
  lateFeeAmount: Money;
  lateFeePercentage: number;
  emailTemplateId: string;
}
export interface DunningRule {
  id: string;
  name: string;
  description: string;
  triggersAfterDays: number;
  action: DunningAction;
  templateId: string;
  status: DunningRuleStatus;
  order: number;
  createdAt: string;
}
