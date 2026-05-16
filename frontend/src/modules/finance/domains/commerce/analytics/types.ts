'use client';
// Analytics Types — Zoho Commerce
import type { Money } from '../../../types/finance-common';

export interface CommerceAnalytics {
  id: string;
  period: string;
  totalRevenue: Money;
  totalOrders: number;
  averageOrderValue: Money;
  conversionRate: number;
  visitorCount: number;
  returningCustomerRate: number;
  topProducts: { productId: string; productName: string; revenue: Money; units: number }[];
  revenueByCategory: { category: string; revenue: Money }[];
  dailyRevenue: { date: string; revenue: Money; orders: number }[];
}
