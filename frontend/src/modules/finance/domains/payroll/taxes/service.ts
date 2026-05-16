'use client';
// Taxes Service — Zoho Payroll
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { TaxConfiguration } from './types';

const mockTaxes: TaxConfiguration[] = [
  { id: 'tax-1', name: 'Federal Income Tax', type: 'federal', description: 'US Federal income tax', rate: 0, brackets: [{ from: 0, to: 11000, rate: 0.10 }, { from: 11001, to: 44725, rate: 0.12 }, { from: 44726, to: 95375, rate: 0.22 }, { from: 95376, to: null, rate: 0.24 }], employerPortion: 0, employeePortion: 100, annualLimit: { amount: 0, currency: 'USD' }, isActive: true, effectiveFrom: '2024-01-01', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'tax-2', name: 'Social Security (FICA)', type: 'fica', description: 'Social Security tax', rate: 6.2, brackets: [], employerPortion: 6.2, employeePortion: 6.2, annualLimit: { amount: 168600, currency: 'USD' }, isActive: true, effectiveFrom: '2024-01-01', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'tax-3', name: 'Medicare', type: 'medicare', description: 'Medicare tax', rate: 1.45, brackets: [], employerPortion: 1.45, employeePortion: 1.45, annualLimit: { amount: 0, currency: 'USD' }, isActive: true, effectiveFrom: '2024-01-01', createdAt: '2024-01-01T10:00:00Z' },
  { id: 'tax-4', name: 'California State Tax', type: 'state', description: 'CA state income tax', rate: 0, brackets: [{ from: 0, to: 10099, rate: 0.01 }, { from: 10100, to: 23942, rate: 0.02 }, { from: 23943, to: null, rate: 0.04 }], employerPortion: 0, employeePortion: 100, annualLimit: { amount: 0, currency: 'USD' }, isActive: true, effectiveFrom: '2024-01-01', createdAt: '2024-01-01T10:00:00Z' },
];

export const taxesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<TaxConfiguration>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockTaxes];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<TaxConfiguration>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockTaxes.find(e => e.id === id);
    if (!item) throw new Error('Tax not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<TaxConfiguration>): Promise<ApiResponse<TaxConfiguration>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockTaxes[0], id: 'tax-' + Date.now(), ...data } as TaxConfiguration;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<TaxConfiguration>): Promise<ApiResponse<TaxConfiguration>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockTaxes.find(e => e.id === id);
    if (!existing) throw new Error('Tax not found');
    return { success: true, data: { ...existing, ...data } as TaxConfiguration };
  },
  getConfigurationById: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  getWithholdings: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  getAllConfigurations: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
};
