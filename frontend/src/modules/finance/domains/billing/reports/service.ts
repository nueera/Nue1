'use client';
// Reports Service — Zoho Billing
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { BillingReport } from './types';

const mockReports: BillingReport[] = [
  { id: 'rpt-1', period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', mrr: { amount: 45000, currency: 'USD' }, arr: { amount: 540000, currency: 'USD' }, newSubscriptions: 28, churnedSubscriptions: 5, netNewMRR: { amount: 3500, currency: 'USD' }, churnRate: 3.2, totalRevenue: { amount: 52000, currency: 'USD' }, outstandingAmount: { amount: 8500, currency: 'USD' } },
  { id: 'rpt-2', period: 'quarterly', startDate: '2024-01-01', endDate: '2024-03-31', mrr: { amount: 48000, currency: 'USD' }, arr: { amount: 576000, currency: 'USD' }, newSubscriptions: 85, churnedSubscriptions: 12, netNewMRR: { amount: 9800, currency: 'USD' }, churnRate: 2.8, totalRevenue: { amount: 158000, currency: 'USD' }, outstandingAmount: { amount: 12000, currency: 'USD' } },
  { id: 'rpt-3', period: 'annually', startDate: '2023-01-01', endDate: '2023-12-31', mrr: { amount: 38000, currency: 'USD' }, arr: { amount: 456000, currency: 'USD' }, newSubscriptions: 310, churnedSubscriptions: 45, netNewMRR: { amount: 28000, currency: 'USD' }, churnRate: 3.5, totalRevenue: { amount: 520000, currency: 'USD' }, outstandingAmount: { amount: 35000, currency: 'USD' } },
];

export const billingReportsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<BillingReport>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockReports];
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<BillingReport>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockReports.find(e => e.id === id);
    if (!item) throw new Error('Report not found');
    return { success: true, data: item };
  },
};
