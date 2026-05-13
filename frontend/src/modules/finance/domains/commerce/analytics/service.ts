'use client';
// Analytics Service — Zoho Commerce
import type { ApiResponse } from '../../../types/finance-common';
import type { CommerceAnalytics } from './types';

const mockAnalytics: CommerceAnalytics = {
  id: 'ca-1', period: '2024-Q1',
  totalRevenue: { amount: 185000, currency: 'USD' },
  totalOrders: 1250,
  averageOrderValue: { amount: 148, currency: 'USD' },
  conversionRate: 3.2,
  visitorCount: 39000,
  returningCustomerRate: 28.5,
  topProducts: [
    { productId: 'cprod-1', productName: 'Premium Widget', revenue: { amount: 85000, currency: 'USD' }, units: 1062 },
    { productId: 'cprod-2', productName: 'Basic Gadget', revenue: { amount: 45000, currency: 'USD' }, units: 1500 },
  ],
  revenueByCategory: [
    { category: 'Widgets', revenue: { amount: 120000, currency: 'USD' } },
    { category: 'Gadgets', revenue: { amount: 65000, currency: 'USD' } },
  ],
  dailyRevenue: [
    { date: '2024-02-01', revenue: { amount: 5200, currency: 'USD' }, orders: 35 },
    { date: '2024-02-02', revenue: { amount: 6100, currency: 'USD' }, orders: 42 },
    { date: '2024-02-03', revenue: { amount: 4800, currency: 'USD' }, orders: 30 },
  ],
};

export const commerceAnalyticsService = {
  get: async (): Promise<ApiResponse<CommerceAnalytics>> => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, data: mockAnalytics };
  },
};
