'use client';
// Storefront Service — Zoho Commerce
import type { ApiResponse } from '../../../types/finance-common';
import type { Storefront } from './types';

const mockStorefront: Storefront = {
  id: 'sf-1', name: 'My Online Store', domain: 'store.example.com', status: 'published',
  theme: { name: 'Modern', primaryColor: '#1E3A5F', secondaryColor: '#F59E0B', font: 'Inter', layout: 'full_width' },
  seo: { title: 'My Store - Premium Products', description: 'Shop the best products online', keywords: ['store', 'shop', 'products'], ogImage: '/og-image.jpg' },
  favicon: '/favicon.ico', logo: '/logo.svg', currency: 'USD', publishedAt: '2024-01-01',
  visitorCount: 25000, orderCount: 1250, revenue: { amount: 185000, currency: 'USD' },
  createdAt: '2024-01-01T10:00:00Z',
};

export const storefrontService = {
  get: async (): Promise<ApiResponse<Storefront>> => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, data: mockStorefront };
  },
  update: async (data: Partial<Storefront>): Promise<ApiResponse<Storefront>> => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, data: { ...mockStorefront, ...data } };
  },
  publish: async (): Promise<ApiResponse<Storefront>> => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, data: { ...mockStorefront, status: 'published', publishedAt: new Date().toISOString() } };
  },
  unpublish: async (): Promise<ApiResponse<Storefront>> => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, data: { ...mockStorefront, status: 'unpublished' } };
  },
};
