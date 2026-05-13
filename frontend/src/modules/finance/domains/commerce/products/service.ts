'use client';
// Products Service — Zoho Commerce
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { CommerceProduct } from './types';

const mockProducts: CommerceProduct[] = [
  { id: 'cprod-1', name: 'Premium Widget', slug: 'premium-widget', description: 'High-quality widget for professionals', price: { amount: 79.99, currency: 'USD' }, compareAtPrice: { amount: 99.99, currency: 'USD' }, status: 'active', categories: ['Widgets', 'Premium'], tags: ['featured', 'bestseller'], images: ['/products/widget-1.jpg'], seo: { slug: 'premium-widget', title: 'Premium Widget', description: 'Buy premium widget', keywords: ['widget', 'premium'] }, stock: 150, isFeatured: true, createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:00:00Z' },
  { id: 'cprod-2', name: 'Basic Gadget', slug: 'basic-gadget', description: 'Affordable gadget for everyday use', price: { amount: 29.99, currency: 'USD' }, compareAtPrice: { amount: 0, currency: 'USD' }, status: 'active', categories: ['Gadgets'], tags: ['budget'], images: ['/products/gadget-1.jpg'], seo: { slug: 'basic-gadget', title: 'Basic Gadget', description: 'Affordable gadget', keywords: ['gadget', 'budget'] }, stock: 300, isFeatured: false, createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z' },
  { id: 'cprod-3', name: 'Pro Toolkit', slug: 'pro-toolkit', description: 'Complete toolkit for professionals', price: { amount: 149.99, currency: 'USD' }, compareAtPrice: { amount: 199.99, currency: 'USD' }, status: 'draft', categories: ['Tools', 'Professional'], tags: ['new'], images: [], seo: { slug: 'pro-toolkit', title: 'Pro Toolkit', description: 'Professional toolkit', keywords: ['toolkit', 'professional'] }, stock: 0, isFeatured: false, createdAt: '2024-02-01T10:00:00Z', updatedAt: '2024-02-01T10:00:00Z' },
];

export const commerceProductsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<CommerceProduct>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockProducts];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.slug.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<CommerceProduct>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockProducts.find(e => e.id === id);
    if (!item) throw new Error('Product not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<CommerceProduct>): Promise<ApiResponse<CommerceProduct>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockProducts[0], id: 'cprod-' + Date.now(), ...data } as CommerceProduct;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<CommerceProduct>): Promise<ApiResponse<CommerceProduct>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockProducts.find(e => e.id === id);
    if (!existing) throw new Error('Product not found');
    return { success: true, data: { ...existing, ...data } as CommerceProduct };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};
