// @ts-nocheck
'use client';

// ============================================================================
// Marketing Search Hook — Cross-entity search across leads, contacts, campaigns, etc.
// ============================================================================

import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { marketingApi } from '../api/client';

interface SearchResult {
  id: string;
  type: 'lead' | 'contact' | 'campaign' | 'journey' | 'audience' | 'segment' | 'form' | 'workflow';
  name: string;
  description?: string;
  status?: string;
  url: string;
}

interface SearchParams {
  query: string;
  entities?: string[];
  limit?: number;
}

export function useMarketingSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const query = useQuery({
    queryKey: ['marketing', 'search', searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return { success: true, data: [] as SearchResult[] };
      return marketingApi.get<SearchResult[]>('/search', {
        q: searchQuery,
        limit: '20',
      });
    },
    enabled: searchQuery.length >= 2,
  });

  const search = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const results = useMemo(() => {
    if (!query.data?.data) return [];
    return query.data.data;
  }, [query.data]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const result of results) {
      if (!groups[result.type]) {
        groups[result.type] = [];
      }
      groups[result.type].push(result);
    }
    return groups;
  }, [results]);

  return {
    searchQuery,
    search,
    clearSearch,
    results,
    groupedResults,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
