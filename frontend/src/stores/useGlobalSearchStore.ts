import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ============================================================
   GLOBAL SEARCH TYPES
   ============================================================ */

export interface SearchResult {
  id: string;
  moduleId: string;
  moduleLabel: string;
  title: string;
  description?: string;
  href: string;
  icon?: string;
}

export interface SearchCategory {
  moduleId: string;
  label: string;
  icon: string;
  results: SearchResult[];
}

/* ============================================================
   GLOBAL SEARCH STORE STATE & ACTIONS
   ============================================================ */

interface GlobalSearchState {
  // State
  isOpen: boolean;
  query: string;
  recentSearches: string[];
  isLoading: boolean;
  results: SearchCategory[];

  // Actions
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setResults: (results: SearchCategory[]) => void;
  setLoading: (loading: boolean) => void;
}

/* ============================================================
   GLOBAL SEARCH STORE
   ============================================================ */

export const useGlobalSearchStore = create<GlobalSearchState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      query: '',
      recentSearches: [],
      isLoading: false,
      results: [],

      openSearch: () => set({ isOpen: true }),

      closeSearch: () =>
        set({ isOpen: false, query: '', results: [], isLoading: false }),

      toggleSearch: () => {
        const { isOpen } = get();
        if (isOpen) {
          set({ isOpen: false, query: '', results: [], isLoading: false });
        } else {
          set({ isOpen: true });
        }
      },

      setQuery: (query) => set({ query }),

      addRecentSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;

        set((state) => {
          // Remove duplicate if exists, then prepend
          const filtered = state.recentSearches.filter(
            (s) => s.toLowerCase() !== trimmed.toLowerCase()
          );
          return {
            recentSearches: [trimmed, ...filtered].slice(0, 10),
          };
        });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      setResults: (results) => set({ results }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'nueone-global-search-store',
      partialize: (state) => ({
        recentSearches: state.recentSearches,
      }),
    }
  )
);
