'use client';
// CorporateCards Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export type CardStatus = 'active' | 'blocked' | 'expired' | 'cancelled';
export interface CorporateCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  employeeId: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  limit: Money;
  spent: Money;
  available: Money;
  expiryMonth: string;
  expiryYear: string;
  status: CardStatus;
  lastTransaction: string;
  createdAt: string;
}
