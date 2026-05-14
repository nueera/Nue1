// @ts-nocheck
// ============================================================================
// CRM Module — Zustand Stores
// ============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CrmModuleName } from './types';

// --- CRM Auth Store ---

interface CrmAuthState {
  user: { id: string; name: string; email: string; avatar: string; role: string } | null;
  isAuthenticated: boolean;
  setUser: (user: CrmAuthState['user']) => void;
  logout: () => void;
}

const DEFAULT_CRM_USER = {
  id: '1',
  name: 'CRM Admin',
  email: 'admin@nuecrm.io',
  avatar: 'CA',
  role: 'admin',
};

export const useCrmAuthStore = create<CrmAuthState>()(
  persist(
    (set) => ({
      user: DEFAULT_CRM_USER,
      isAuthenticated: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'nueone-crm-auth-store' }
  )
);

// --- CRM UI Store (with scroll restore + page tracking) ---

interface RecentModule {
  slug: string;
  lastVisited: number;
  visitCount: number;
}

interface CrmUIState {
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
  isRecentlyUsed: (slug: string) => boolean;
}

const MAX_RECENT_MODULES = 5;

export const useCrmUIStore = create<CrmUIState>()(
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
      isRecentlyUsed: (slug) => get().recentModules.some((m) => m.slug === slug),
    }),
    {
      name: 'nueone-crm-store',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        sidebarActiveItem: state.sidebarActiveItem,
        lastVisitedPage: state.lastVisitedPage,
        recentModules: state.recentModules,
      }),
    }
  )
);

// --- CRM Sidebar Store (legacy — kept for backwards compat, delegates to CrmUIStore) ---
// NOTE: New code should use useCrmUIStore instead.
// This store is kept so existing imports in domain components don't break.

interface CrmSidebarState {
  collapsed: boolean;
  activeItem: string;
  mobileOpen: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  setActiveItem: (item: string) => void;
  setMobileOpen: (open: boolean) => void;
}

export const useCrmSidebarStore = create<CrmSidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      activeItem: 'leads',
      mobileOpen: false,
      setCollapsed: (collapsed) => set({ collapsed }),
      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      setActiveItem: (item) => set({ activeItem: item }),
      setMobileOpen: (open) => set({ mobileOpen: open }),
    }),
    { name: 'crm-sidebar-store' }
  )
);

// --- CRM Pipeline Preferences Store ---

interface PipelinePreferences {
  selectedPipelineId: string;
  viewMode: 'kanban' | 'list';
  compactView: boolean;
}

interface CrmPipelinePreferencesState {
  pipelines: Record<CrmModuleName, PipelinePreferences>;
  setPipelinePreference: (module: CrmModuleName, prefs: Partial<PipelinePreferences>) => void;
  getPipelinePreference: (module: CrmModuleName) => PipelinePreferences;
}

const defaultPipelinePrefs: PipelinePreferences = {
  selectedPipelineId: 'default',
  viewMode: 'kanban',
  compactView: false,
};

export const useCrmPipelinePreferencesStore = create<CrmPipelinePreferencesState>()(
  persist(
    (set, get) => ({
      pipelines: {} as Record<CrmModuleName, PipelinePreferences>,
      setPipelinePreference: (module, prefs) =>
        set((state) => ({
          pipelines: {
            ...state.pipelines,
            [module]: { ...(state.pipelines[module] ?? defaultPipelinePrefs), ...prefs },
          },
        })),
      getPipelinePreference: (module) => get().pipelines[module] ?? defaultPipelinePrefs,
    }),
    { name: 'crm-pipeline-preferences' }
  )
);

// --- CRM List View Preferences Store ---

interface ListViewPreferences {
  selectedFields: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  pageSize: number;
}

interface CrmListViewPreferencesState {
  views: Record<CrmModuleName, ListViewPreferences>;
  setViewPreference: (module: CrmModuleName, prefs: Partial<ListViewPreferences>) => void;
  getViewPreference: (module: CrmModuleName) => ListViewPreferences;
}

const defaultListViewPrefs: ListViewPreferences = {
  selectedFields: [],
  sortBy: 'createdAt',
  sortOrder: 'desc',
  pageSize: 25,
};

export const useCrmListViewPreferencesStore = create<CrmListViewPreferencesState>()(
  persist(
    (set, get) => ({
      views: {} as Record<CrmModuleName, ListViewPreferences>,
      setViewPreference: (module, prefs) =>
        set((state) => ({
          views: {
            ...state.views,
            [module]: { ...(state.views[module] ?? defaultListViewPrefs), ...prefs },
          },
        })),
      getViewPreference: (module) => get().views[module] ?? defaultListViewPrefs,
    }),
    { name: 'crm-list-view-preferences' }
  )
);

// --- CRM Quick Create Store ---

interface CrmQuickCreateState {
  isOpen: boolean;
  moduleName: CrmModuleName | null;
  prefillData: Record<string, unknown>;
  openQuickCreate: (module: CrmModuleName, prefill?: Record<string, unknown>) => void;
  closeQuickCreate: () => void;
}

export const useCrmQuickCreateStore = create<CrmQuickCreateState>()((set) => ({
  isOpen: false,
  moduleName: null,
  prefillData: {},
  openQuickCreate: (module, prefill = {}) =>
    set({ isOpen: true, moduleName: module, prefillData: prefill }),
  closeQuickCreate: () =>
    set({ isOpen: false, moduleName: null, prefillData: {} }),
}));

// --- CRM Recent Records Store ---

interface RecentRecord {
  id: string;
  name: string;
  module: CrmModuleName;
  accessedAt: string;
}

interface CrmRecentRecordsState {
  records: RecentRecord[];
  addRecent: (record: Omit<RecentRecord, 'accessedAt'>) => void;
  clearRecent: () => void;
}

const MAX_RECENT = 10;

export const useCrmRecentRecordsStore = create<CrmRecentRecordsState>()(
  persist(
    (set) => ({
      records: [],
      addRecent: (record) =>
        set((state) => {
          const filtered = state.records.filter(
            (r) => !(r.id === record.id && r.module === record.module)
          );
          return {
            records: [
              { ...record, accessedAt: new Date().toISOString() },
              ...filtered,
            ].slice(0, MAX_RECENT),
          };
        }),
      clearRecent: () => set({ records: [] }),
    }),
    { name: 'crm-recent-records' }
  )
);
