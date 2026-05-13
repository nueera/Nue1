'use client';
// Search Types — Finance Shared

export type SearchEntityType = 'invoice' | 'estimate' | 'customer' | 'vendor' | 'expense' | 'product' | 'subscription' | 'order';
export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle: string;
  url: string;
  score: number;
}
