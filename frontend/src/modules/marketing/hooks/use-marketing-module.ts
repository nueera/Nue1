'use client';

// ============================================================================
// useMarketingModule — Module-level hook for active product, page management, search
// ============================================================================

import { useCallback, useMemo } from 'react';
import type { MarketingProduct } from '../types';
import { useMarketingStore } from '../stores/marketing-store';
import {
  PRODUCT_NAV_CONFIGS,
  PRODUCT_LABELS,
  PRODUCT_DESCRIPTIONS,
  getNavSectionsForProduct,
  getAllNavItemsForProduct,
} from '../constants/navigation';
import { MARKETING_CONFIG, ROUTES } from '../config';

interface MarketingModuleState {
  /** Currently active marketing product */
  activeProduct: MarketingProduct;
  /** Switch to a different marketing product */
  switchProduct: (product: MarketingProduct) => void;
  /** Get the label for a product */
  getProductLabel: (product: MarketingProduct) => string;
  /** Get the description for a product */
  getProductDescription: (product: MarketingProduct) => string;
  /** Get the route path for a product */
  getProductRoute: (product: MarketingProduct) => string;
  /** Currently active page */
  currentPage: string;
  /** Set current page */
  setCurrentPage: (page: string) => void;
  /** Navigate to a specific page slug */
  navigate: (slug: string) => void;
  /** Search across marketing entities */
  search: (query: string) => void;
  /** Currently active sidebar item */
  activeItemId: string;
  /** Set active sidebar item */
  setActiveItemId: (itemId: string) => void;
  /** All available products */
  products: readonly MarketingProduct[];
  /** Nav sections for the active product */
  navSections: ReturnType<typeof getNavSectionsForProduct>;
  /** All nav items for the active product */
  allNavItems: ReturnType<typeof getAllNavItemsForProduct>;
  /** Whether the store is hydrated */
  isReady: boolean;
  /** Track a page visit for recent modules */
  trackPageVisit: (slug: string) => void;
}

export function useMarketingModule(): MarketingModuleState {
  // Select only the specific state/actions we need — avoids re-rendering when
  // unrelated store slices change (e.g. scrollPositions, mobileSidebarOpen)
  const activeProduct = useMarketingStore((s) => s.activeProduct);
  const setActiveProduct = useMarketingStore((s) => s.setActiveProduct);
  const currentPage = useMarketingStore((s) => s.currentPage);
  const setStoreCurrentPage = useMarketingStore((s) => s.setCurrentPage);
  const setSidebarActiveItem = useMarketingStore((s) => s.setSidebarActiveItem);
  const sidebarActiveItem = useMarketingStore((s) => s.sidebarActiveItem);
  const trackPageVisit = useMarketingStore((s) => s.trackPageVisit);
  const isHydrated = useMarketingStore((s) => s.isHydrated);

  const switchProduct = useCallback(
    (product: MarketingProduct) => {
      setActiveProduct(product);
      const dashboardSlug = `${product}/dashboard`;
      setStoreCurrentPage(dashboardSlug);
      setSidebarActiveItem(`${product}-dashboard`);
      trackPageVisit(dashboardSlug);
    },
    [setActiveProduct, setStoreCurrentPage, setSidebarActiveItem, trackPageVisit]
  );

  const getProductLabel = useCallback(
    (product: MarketingProduct) => PRODUCT_LABELS[product],
    []
  );

  const getProductDescription = useCallback(
    (product: MarketingProduct) => PRODUCT_DESCRIPTIONS[product],
    []
  );

  const getProductRoute = useCallback(
    (product: MarketingProduct) => ROUTES[product as keyof typeof ROUTES],
    []
  );

  const navigate = useCallback(
    (slug: string) => {
      setStoreCurrentPage(slug);
      setSidebarActiveItem(slug.replace('/', '-'));
      trackPageVisit(slug);
    },
    [setStoreCurrentPage, setSidebarActiveItem, trackPageVisit]
  );

  const search = useCallback(
    (query: string) => {
      // In a real implementation, this would trigger a global search
      setStoreCurrentPage(`search?q=${encodeURIComponent(query)}`);
    },
    [setStoreCurrentPage]
  );

  const navSections = useMemo(
    () => getNavSectionsForProduct(activeProduct),
    [activeProduct]
  );

  const allNavItems = useMemo(
    () => getAllNavItemsForProduct(activeProduct),
    [activeProduct]
  );

  return useMemo(
    () => ({
      activeProduct,
      switchProduct,
      getProductLabel,
      getProductDescription,
      getProductRoute,
      currentPage,
      setCurrentPage: setStoreCurrentPage,
      navigate,
      search,
      activeItemId: sidebarActiveItem,
      setActiveItemId: setSidebarActiveItem,
      products: MARKETING_CONFIG.products,
      navSections,
      allNavItems,
      isReady: isHydrated,
      trackPageVisit,
    }),
    [
      activeProduct,
      switchProduct,
      getProductLabel,
      getProductDescription,
      getProductRoute,
      currentPage,
      setStoreCurrentPage,
      navigate,
      search,
      setSidebarActiveItem,
      navSections,
      allNavItems,
      isHydrated,
      trackPageVisit,
    ]
  );
}
