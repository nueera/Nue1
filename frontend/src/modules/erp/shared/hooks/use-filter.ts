import { useState, useCallback } from 'react';

export type FilterState = Record<string, string>;

export function useFilter(initialFilters: FilterState = {}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const removeFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const activeFilterCount = Object.values(filters).filter((v) => v && v !== 'All').length;

  return { filters, setFilter, removeFilter, clearFilters, activeFilterCount };
}
