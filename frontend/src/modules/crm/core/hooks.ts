// ============================================================================
// CRM Module — Shared Hooks
// ============================================================================

'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CrmModuleName } from './types';
import { crmKeys } from './query-keys';
import {
  useCrmSidebarStore,
  useCrmQuickCreateStore,
  useCrmRecentRecordsStore,
  useCrmPipelinePreferencesStore,
  useCrmListViewPreferencesStore,
} from './store';
import { CRM_MODULES } from './constants';

// --- useCrmModule — Get module metadata ---

export function useCrmModule(moduleName: CrmModuleName) {
  return useMemo(
    () => CRM_MODULES.find((m) => m.name === moduleName),
    [moduleName]
  );
}

// --- useCrmSidebar ---

export function useCrmSidebar() {
  const collapsed = useCrmSidebarStore((s) => s.collapsed);
  const activeItem = useCrmSidebarStore((s) => s.activeItem);
  const mobileOpen = useCrmSidebarStore((s) => s.mobileOpen);
  const setCollapsed = useCrmSidebarStore((s) => s.setCollapsed);
  const toggleCollapsed = useCrmSidebarStore((s) => s.toggleCollapsed);
  const setActiveItem = useCrmSidebarStore((s) => s.setActiveItem);
  const setMobileOpen = useCrmSidebarStore((s) => s.setMobileOpen);

  return {
    collapsed,
    activeItem,
    mobileOpen,
    setCollapsed,
    toggleCollapsed,
    setActiveItem,
    setMobileOpen,
  };
}

// --- useCrmQuickCreate ---

export function useCrmQuickCreate() {
  const isOpen = useCrmQuickCreateStore((s) => s.isOpen);
  const moduleName = useCrmQuickCreateStore((s) => s.moduleName);
  const prefillData = useCrmQuickCreateStore((s) => s.prefillData);
  const openQuickCreate = useCrmQuickCreateStore((s) => s.openQuickCreate);
  const closeQuickCreate = useCrmQuickCreateStore((s) => s.closeQuickCreate);

  return { isOpen, moduleName, prefillData, openQuickCreate, closeQuickCreate };
}

// --- useCrmRecentRecords ---

export function useCrmRecentRecords() {
  const records = useCrmRecentRecordsStore((s) => s.records);
  const addRecent = useCrmRecentRecordsStore((s) => s.addRecent);
  const clearRecent = useCrmRecentRecordsStore((s) => s.clearRecent);

  return { records, addRecent, clearRecent };
}

// --- useCrmFavorites ---

const FAVORITES_KEY = 'crm-favorites';

export function useCrmFavorites() {
  const [favorites, setFavorites] = useState<Record<string, string[]>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');
    } catch {
      return {};
    }
  });

  const toggleFavorite = useCallback(
    (module: CrmModuleName, recordId: string) => {
      setFavorites((prev) => {
        const moduleFavs = prev[module] ?? [];
        const updated = moduleFavs.includes(recordId)
          ? moduleFavs.filter((id) => id !== recordId)
          : [...moduleFavs, recordId];
        const next = { ...prev, [module]: updated };
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const isFavorite = useCallback(
    (module: CrmModuleName, recordId: string) => {
      return (favorites[module] ?? []).includes(recordId);
    },
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}

// --- useCrmTag ---

export function useCrmTag() {
  const queryClient = useQueryClient();

  const tagRecord = useMutation({
    mutationFn: async ({ recordId, tagId }: { recordId: string; tagId: string }) => {
      // Will be implemented with real API
      return { recordId, tagId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crmKeys.tags.all });
    },
  });

  const untagRecord = useMutation({
    mutationFn: async ({ recordId, tagId }: { recordId: string; tagId: string }) => {
      return { recordId, tagId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crmKeys.tags.all });
    },
  });

  return { tagRecord, untagRecord };
}

// --- useCrmSearch ---

export function useCrmSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = useQuery({
    queryKey: crmKeys.search.global(query),
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      // Will be implemented with real API
      return [];
    },
    enabled: query.length >= 2,
  });

  const suggestions = useQuery({
    queryKey: crmKeys.search.suggestions(query),
    queryFn: async () => {
      if (!query || query.length < 1) return [];
      return [];
    },
    enabled: query.length >= 1,
  });

  return {
    query,
    setQuery,
    isSearching,
    searchResults: searchResults.data ?? [],
    suggestions: suggestions.data ?? [],
  };
}

// --- useCrmRecord — Generic record access hook ---

export function useCrmRecord<T>(
  module: CrmModuleName,
  id: string,
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>
) {
  const { addRecent } = useCrmRecentRecords();

  const query = useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
  });

  // Track as recent when data loads
  useEffect(() => {
    if (query.data && typeof query.data === 'object' && 'id' in (query.data as object)) {
      const record = query.data as { id: string; name?: string; firstName?: string; lastName?: string };
      const recordName = record.name || `${record.firstName ?? ''} ${record.lastName ?? ''}`.trim() || record.id;
      addRecent({ id: record.id, name: recordName, module });
    }
  }, [query.data, module, addRecent]);

  return query;
}

// --- Pipeline Preferences Hook ---

export function useCrmPipelinePreferences(module: CrmModuleName) {
  const setPreference = useCrmPipelinePreferencesStore((s) => s.setPipelinePreference);
  const getPreference = useCrmPipelinePreferencesStore((s) => s.getPipelinePreference);

  const preference = getPreference(module);

  return {
    ...preference,
    setPipelineId: (id: string) => setPreference(module, { selectedPipelineId: id }),
    setViewMode: (mode: 'kanban' | 'list') => setPreference(module, { viewMode: mode }),
    setCompactView: (compact: boolean) => setPreference(module, { compactView: compact }),
  };
}

// --- List View Preferences Hook ---

export function useCrmListViewPreferences(module: CrmModuleName) {
  const setPreference = useCrmListViewPreferencesStore((s) => s.setViewPreference);
  const getPreference = useCrmListViewPreferencesStore((s) => s.getViewPreference);

  const preference = getPreference(module);

  return {
    ...preference,
    setSelectedFields: (fields: string[]) => setPreference(module, { selectedFields: fields }),
    setSortBy: (field: string) => setPreference(module, { sortBy: field }),
    setSortOrder: (order: 'asc' | 'desc') => setPreference(module, { sortOrder: order }),
    setPageSize: (size: number) => setPreference(module, { pageSize: size }),
  };
}
