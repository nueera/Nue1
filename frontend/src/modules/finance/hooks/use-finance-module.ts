// @ts-nocheck
'use client';

// ============================================================================
// useFinanceModule Hook
// Module-level hook for active product, switching, and page management.
// ============================================================================

import { useCallback, useMemo } from 'react';
import type { FinanceProduct } from '../types';
import { useFinanceStore } from '../stores/finance-store';
import { useSidebarStore } from '../stores/sidebar-store';
import {
  PRODUCT_NAV_CONFIGS,
  PRODUCT_LABELS,
  PRODUCT_DESCRIPTIONS,
  getNavSectionsForProduct,
  getAllNavItemsForProduct,
} from '../constants/navigation';
import { FINANCE_CONFIG, ROUTES } from '../config';

interface FinanceModuleState {
  /** Currently active finance product */
  activeProduct: FinanceProduct;
  /** Switch to a different finance product */
  switchProduct: (product: FinanceProduct) => void;
  /** Get the label for a product */
  getProductLabel: (product: FinanceProduct) => string;
  /** Get the description for a product */
  getProductDescription: (product: FinanceProduct) => string;
  /** Get the route path for a product */
  getProductRoute: (product: FinanceProduct) => string;
  /** Currently active page */
  currentPage: string;
  /** Set current page */
  setCurrentPage: (page: string) => void;
  /** Currently active sidebar item */
  activeItemId: string;
  /** Set active sidebar item */
  setActiveItemId: (itemId: string) => void;
  /** All available products */
  products: readonly FinanceProduct[];
  /** Nav sections for the active product */
  navSections: ReturnType<typeof getNavSectionsForProduct>;
  /** All nav items for the active product */
  allNavItems: ReturnType<typeof getAllNavItemsForProduct>;
  /** Whether the store is hydrated */
  isReady: boolean;
  /** Track a page visit for recent modules */
  trackPageVisit: (slug: string) => void;
}

export function useFinanceModule(): FinanceModuleState {
  const {
    activeProduct,
    setActiveProduct,
    currentPage,
    setCurrentPage: setStoreCurrentPage,
    trackPageVisit,
    isHydrated,
  } = useFinanceStore();

  const { activeItemId, setActiveItemId } = useSidebarStore();

  const switchProduct = useCallback(
    (product: FinanceProduct) => {
      setActiveProduct(product);
      const dashboardSlug = `${product}/dashboard`;
      setStoreCurrentPage(dashboardSlug);
      trackPageVisit(dashboardSlug);
    },
    [setActiveProduct, setStoreCurrentPage, trackPageVisit]
  );

  const getProductLabel = useCallback(
    (product: FinanceProduct) => PRODUCT_LABELS[product],
    []
  );

  const getProductDescription = useCallback(
    (product: FinanceProduct) => PRODUCT_DESCRIPTIONS[product],
    []
  );

  const getProductRoute = useCallback(
    (product: FinanceProduct) => ROUTES[product as keyof typeof ROUTES],
    []
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
      activeItemId,
      setActiveItemId,
      products: FINANCE_CONFIG.products,
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
      activeItemId,
      setActiveItemId,
      navSections,
      allNavItems,
      isHydrated,
      trackPageVisit,
    ]
  );
}
