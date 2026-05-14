// @ts-nocheck
// ============================================================================
// Marketing Sidebar Store
// Manages sidebar state: collapsed, active product, open sections, etc.
// Same pattern as Finance's sidebar-store.ts.
// ============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MarketingProduct } from '../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SidebarState {
  /** Whether the sidebar is collapsed */
  collapsed: boolean;

  /** Which product is currently highlighted/active in the sidebar */
  activeProduct: MarketingProduct;

  /** Which nav item is currently active */
  activeItemId: string;

  /** Which sections are expanded (section title as key) */
  expandedSections: Record<string, boolean>;

  /** Whether mobile sidebar overlay is open */
  mobileOpen: boolean;

  /** Whether the product switcher dropdown is open */
  productSwitcherOpen: boolean;

  // Actions
  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setActiveProduct: (product: MarketingProduct) => void;
  setActiveItemId: (itemId: string) => void;
  toggleSection: (sectionTitle: string) => void;
  setMobileOpen: (open: boolean) => void;
  setProductSwitcherOpen: (open: boolean) => void;
  expandAllSections: () => void;
  collapseAllSections: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      collapsed: false,
      activeProduct: 'campaigns',
      activeItemId: 'campaigns-dashboard',
      expandedSections: {
        Overview: true,
      },
      mobileOpen: false,
      productSwitcherOpen: false,

      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      setCollapsed: (collapsed) => set({ collapsed }),

      setActiveProduct: (product) =>
        set({
          activeProduct: product,
          activeItemId: `${product}-dashboard`,
          expandedSections: { Overview: true },
        }),

      setActiveItemId: (itemId) => set({ activeItemId: itemId }),

      toggleSection: (sectionTitle) => {
        const { expandedSections } = get();
        set({
          expandedSections: {
            ...expandedSections,
            [sectionTitle]: !expandedSections[sectionTitle],
          },
        });
      },

      setMobileOpen: (open) => set({ mobileOpen: open }),
      setProductSwitcherOpen: (open) => set({ productSwitcherOpen: open }),

      expandAllSections: () => {
        const { expandedSections } = get();
        const allExpanded: Record<string, boolean> = {};
        Object.keys(expandedSections).forEach((key) => {
          allExpanded[key] = true;
        });
        set({ expandedSections: allExpanded });
      },

      collapseAllSections: () => {
        const { expandedSections } = get();
        const allCollapsed: Record<string, boolean> = {};
        Object.keys(expandedSections).forEach((key) => {
          allCollapsed[key] = false;
        });
        set({ expandedSections: allCollapsed });
      },
    }),
    {
      name: 'nueone-marketing-sidebar',
      partialize: (state) => ({
        collapsed: state.collapsed,
        activeProduct: state.activeProduct,
        activeItemId: state.activeItemId,
        expandedSections: state.expandedSections,
      }),
    }
  )
);
