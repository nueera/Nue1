'use client';
// HostedPages Types — Zoho Billing
import type { Money } from '../../../types/finance-common';

export type HostedPageType = 'checkout' | 'portal' | 'update_payment';
export type HostedPageStatus = 'active' | 'expired' | 'used';
export interface HostedPage {
  id: string;
  type: HostedPageType;
  url: string;
  planId: string;
  planName: string;
  status: HostedPageStatus;
  expiresAt: string;
  createdAt: string;
  completedAt: string;
  subscriptionId: string;
}
