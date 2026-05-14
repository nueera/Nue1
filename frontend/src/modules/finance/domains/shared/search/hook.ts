// @ts-nocheck
// Search Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchService } from './service';
import { searchKeys } from './query-keys';

export function useSearch(query: string) {
  return useQuery({
    queryKey: [...searchKeys.all, 'search', query],
    queryFn: () => searchService.search(query),
    enabled: !!query && query.length >= 2,
  });
}

export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: [...searchKeys.all, 'suggestions', query],
    queryFn: () => searchService.getSuggestions(query),
    enabled: !!query && query.length >= 1,
  });
}

export function useRecentSearches() {
  return useQuery({
    queryKey: [...searchKeys.all, 'recent'],
    queryFn: () => searchService.getRecentSearches(),
  });
}

export function useSaveRecentSearch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: searchService.saveRecentSearch,
    onSuccess: () => { qc.invalidateQueries({ queryKey: [...searchKeys.all, 'recent'] }); },
  });
}

export function useClearRecentSearches() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: searchService.clearRecentSearches,
    onSuccess: () => { qc.invalidateQueries({ queryKey: [...searchKeys.all, 'recent'] }); },
  });
}
