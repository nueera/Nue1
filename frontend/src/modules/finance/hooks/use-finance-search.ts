'use client';

// ============================================================================
// useFinanceSearch Hook
// Cross-product search across all Finance products.
// ============================================================================

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { FinanceProduct } from '../types';
import { financeApiClient } from '../api/client';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FinanceSearchCategory =
  | 'customers'
  | 'vendors'
  | 'invoices'
  | 'estimates'
  | 'bills'
  | 'payments'
  | 'expenses'
  | 'items'
  | 'subscriptions'
  | 'orders'
  | 'employees'
  | 'transactions';

export interface FinanceSearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category: FinanceSearchCategory;
  product: FinanceProduct;
  url: string;
  metadata?: Record<string, string>;
}

export interface FinanceSearchFilters {
  query: string;
  products?: FinanceProduct[];
  categories?: FinanceSearchCategory[];
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}

// ---------------------------------------------------------------------------
// Hook Return Type
// ---------------------------------------------------------------------------

interface UseFinanceSearchReturn {
  /** Current search query */
  query: string;
  /** Set search query */
  setQuery: (query: string) => void;
  /** Search results */
  results: FinanceSearchResult[];
  /** Whether a search is in progress */
  isSearching: boolean;
  /** Whether there are results */
  hasResults: boolean;
  /** Whether the search has been executed */
  hasSearched: boolean;
  /** Execute search */
  search: (filters?: Partial<FinanceSearchFilters>) => Promise<void>;
  /** Clear search */
  clearSearch: () => void;
  /** Get results grouped by product */
  resultsByProduct: Record<string, FinanceSearchResult[]>;
  /** Get results grouped by category */
  resultsByCategory: Record<string, FinanceSearchResult[]>;
  /** Total result count */
  totalResults: number;
  /** Error message */
  error: string | null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useFinanceSearch(): UseFinanceSearchReturn {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<FinanceSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setQuery = useCallback((q: string) => {
    setQueryState(q);
    setError(null);
  }, []);

  const search = useCallback(
    async (filters?: Partial<FinanceSearchFilters>) => {
      const searchQuery = filters?.query ?? query;
      if (!searchQuery.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setIsSearching(true);
      setError(null);
      setHasSearched(true);

      try {
        const params: Record<string, string | number | boolean | undefined> = {
          q: searchQuery,
        };
        if (filters?.products?.length) {
          params.products = filters.products.join(',');
        }
        if (filters?.categories?.length) {
          params.categories = filters.categories.join(',');
        }
        if (filters?.dateFrom) params.dateFrom = filters.dateFrom;
        if (filters?.dateTo) params.dateTo = filters.dateTo;
        if (filters?.status) params.status = filters.status;

        const response = await financeApiClient.get<{ results: FinanceSearchResult[] }>(
          '/search',
          params
        );
        setResults(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [query]
  );

  const clearSearch = useCallback(() => {
    setQueryState('');
    setResults([]);
    setHasSearched(false);
    setError(null);
  }, []);

  // Group results by product
  const resultsByProduct = useMemo(() => {
    const grouped: Record<string, FinanceSearchResult[]> = {};
    for (const result of results) {
      if (!grouped[result.product]) {
        grouped[result.product] = [];
      }
      grouped[result.product].push(result);
    }
    return grouped;
  }, [results]);

  // Group results by category
  const resultsByCategory = useMemo(() => {
    const grouped: Record<string, FinanceSearchResult[]> = {};
    for (const result of results) {
      if (!grouped[result.category]) {
        grouped[result.category] = [];
      }
      grouped[result.category].push(result);
    }
    return grouped;
  }, [results]);

  // Debounced auto-search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        search();
      }, 300);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, search]);

  return useMemo(
    () => ({
      query,
      setQuery,
      results,
      isSearching,
      hasResults: results.length > 0,
      hasSearched,
      search,
      clearSearch,
      resultsByProduct,
      resultsByCategory,
      totalResults: results.length,
      error,
    }),
    [query, results, isSearching, hasSearched, search, clearSearch, resultsByProduct, resultsByCategory, error]
  );
}
