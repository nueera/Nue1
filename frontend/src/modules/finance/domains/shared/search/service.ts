'use client';
// Search Service — Finance Shared
import type { ApiResponse } from '../../../types/finance-common';
import type { SearchResult } from './types';

const mockResults: SearchResult[] = [
  { id: 'inv-1', type: 'invoice', title: 'INV-001', subtitle: 'Acme Corp - $5,500.00', url: '/finance/invoice/invoices/inv-1', score: 1 },
  { id: 'c1', type: 'customer', title: 'Acme Corp', subtitle: 'billing@acme.com', url: '/finance/contacts/c1', score: 0.9 },
  { id: 'est-1', type: 'estimate', title: 'EST-001', subtitle: 'Acme Corp - $1,100.00', url: '/finance/invoice/estimates/est-1', score: 0.8 },
  { id: 'sub-1', type: 'subscription', title: 'Starter Monthly', subtitle: 'Acme Corp', url: '/finance/billing/subscriptions/sub-1', score: 0.7 },
];

export const searchService = {
  search: async (query: string): Promise<ApiResponse<SearchResult[]>> => {
    await new Promise(r => setTimeout(r, 150));
    if (!query) return { success: true, data: [] };
    const q = query.toLowerCase();
    const results = mockResults.filter(r => r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q));
    return { success: true, data: results };
  },
};
