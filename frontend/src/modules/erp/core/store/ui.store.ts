import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentModule {
  slug: string;
  lastVisited: number;
  visitCount: number;
}

interface UIState {
  sidebarCollapsed: boolean;
  sidebarActiveItem: string;
  currentPage: string;
  mobileSidebarOpen: boolean;
  lastVisitedPage: string;
  recentModules: RecentModule[];
  scrollPositions: Record<string, number>;

  toggleSidebar: () => void;
  setSidebarActiveItem: (item: string) => void;
  setCurrentPage: (page: string) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  trackPageVisit: (slug: string) => void;
  setScrollPosition: (page: string, position: number) => void;
  getScrollPosition: (page: string) => number;
  getRecentModules: () => RecentModule[];
  isRecentlyUsed: (slug: string) => boolean;
}

const MAX_RECENT_MODULES = 5;

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      sidebarActiveItem: 'dashboard',
      currentPage: 'dashboard',
      mobileSidebarOpen: false,
      lastVisitedPage: 'dashboard',
      recentModules: [],
      scrollPositions: {},

      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarActiveItem: (item) => set({ sidebarActiveItem: item }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

      trackPageVisit: (slug) => {
        const { recentModules } = get();
        const now = Date.now();
        const existing = recentModules.find((m) => m.slug === slug);
        let updated: RecentModule[];

        if (existing) {
          updated = recentModules.map((m) =>
            m.slug === slug ? { ...m, lastVisited: now, visitCount: m.visitCount + 1 } : m
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
    }),
    {
      name: 'nueone-erp-store',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        sidebarActiveItem: state.sidebarActiveItem,
        lastVisitedPage: state.lastVisitedPage,
        recentModules: state.recentModules,
      }),
    }
  )
);
