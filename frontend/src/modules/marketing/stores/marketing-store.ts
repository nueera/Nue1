// ============================================================================
// Marketing UI Store
// Global Zustand store with persist for the Marketing module.
// Same pattern as Finance's finance-store.ts.
// ============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MarketingProduct, RecentModule } from '../types';
import { MARKETING_CONFIG } from '../config';

// ---------------------------------------------------------------------------
// State Interface
// ---------------------------------------------------------------------------

interface MarketingUIState {
  // Sidebar
  sidebarCollapsed: boolean;
  sidebarActiveItem: string;

  // Product
  activeProduct: MarketingProduct;

  // Page
  currentPage: string;
  lastVisitedPage: string;

  // Mobile
  mobileSidebarOpen: boolean;

  // Tracking
  recentModules: RecentModule[];

  // Scroll restoration
  scrollPositions: Record<string, number>;

  // Hydration flag
  isHydrated: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarActiveItem: (item: string) => void;
  setActiveProduct: (product: MarketingProduct) => void;
  setCurrentPage: (page: string) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  trackPageVisit: (slug: string) => void;
  setScrollPosition: (page: string, position: number) => void;
  getScrollPosition: (page: string) => number;
  getRecentModules: () => RecentModule[];
  isRecentlyUsed: (slug: string) => boolean;
  resetState: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_RECENT_MODULES = 8;

const initialState = {
  sidebarCollapsed: false,
  sidebarActiveItem: 'campaigns-dashboard',
  activeProduct: MARKETING_CONFIG.defaultProduct as MarketingProduct,
  currentPage: 'campaigns/dashboard',
  lastVisitedPage: 'campaigns/dashboard',
  mobileSidebarOpen: false,
  recentModules: [] as RecentModule[],
  scrollPositions: {} as Record<string, number>,
  isHydrated: false,
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useMarketingStore = create<MarketingUIState>()(
  persist(
    (set, get) => ({
      ...initialState,

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarActiveItem: (item) => set({ sidebarActiveItem: item }),

      setActiveProduct: (product) =>
        set({
          activeProduct: product,
          currentPage: `${product}/dashboard`,
          lastVisitedPage: `${product}/dashboard`,
          sidebarActiveItem: `${product}-dashboard`,
        }),

      setCurrentPage: (page) => set({ currentPage: page }),

      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

      trackPageVisit: (slug) => {
        const { recentModules } = get();
        const now = Date.now();
        const existing = recentModules.find((m) => m.slug === slug);
        let updated: RecentModule[];

        if (existing) {
          updated = recentModules.map((m) =>
            m.slug === slug
              ? { ...m, lastVisited: now, visitCount: m.visitCount + 1 }
              : m
          );
        } else {
          updated = [...recentModules, { slug, lastVisited: now, visitCount: 1 }];
        }

        updated.sort((a, b) => {
          if (b.visitCount !== a.visitCount) return b.visitCount - a.visitCount;
          return b.lastVisited - a.lastVisited;
        });

        if (updated.length > MAX_RECENT_MODULES) {
          updated = updated.slice(0, MAX_RECENT_MODULES);
        }

        set({ recentModules: updated, lastVisitedPage: slug });
      },

      setScrollPosition: (page, position) => {
        set((state) => ({
          scrollPositions: { ...state.scrollPositions, [page]: position },
        }));
      },

      getScrollPosition: (page) => get().scrollPositions[page] || 0,

      getRecentModules: () => get().recentModules,

      isRecentlyUsed: (slug) => get().recentModules.some((m) => m.slug === slug),

      resetState: () => set(initialState),
    }),
    {
      name: 'nueone-marketing-store',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        sidebarActiveItem: state.sidebarActiveItem,
        activeProduct: state.activeProduct,
        lastVisitedPage: state.lastVisitedPage,
        recentModules: state.recentModules,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
