'use client';
// Products Service — Zoho Billing
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { BillingProduct } from './types';

const mockProducts: BillingProduct[] = [
  { id: 'bp-1', name: 'Pro Plan', description: 'Professional subscription plan', status: 'active', productType: 'digital', sku: 'SKU-PRO', price: { amount: 49, currency: 'USD' }, createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:00:00Z' },
  { id: 'bp-2', name: 'Enterprise Plan', description: 'Enterprise-level subscription', status: 'active', productType: 'digital', sku: 'SKU-ENT', price: { amount: 199, currency: 'USD' }, createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:00:00Z' },
  { id: 'bp-3', name: 'Support Add-on', description: 'Premium support package', status: 'active', productType: 'service', sku: 'SKU-SUP', price: { amount: 29, currency: 'USD' }, createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z' },
];

export const billingProductsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<BillingProduct>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockProducts];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.sku.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<BillingProduct>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockProducts.find(e => e.id === id);
    if (!item) throw new Error('Product not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<BillingProduct>): Promise<ApiResponse<BillingProduct>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockProducts[0], id: 'bp-' + Date.now(), ...data } as BillingProduct;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<BillingProduct>): Promise<ApiResponse<BillingProduct>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockProducts.find(e => e.id === id);
    if (!existing) throw new Error('Product not found');
    return { success: true, data: { ...existing, ...data } as BillingProduct };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

/** @deprecated Use billingProductsService */
export const productsService = billingProductsService;
