'use client';

// ============================================================================
// Finance Provider
// Context provider that wraps the Finance module, provides the active product
// context and module-level state to all child components.
// ============================================================================

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { FinanceProduct } from '../types';
import { FINANCE_CONFIG, PRODUCT_SETTINGS } from '../config';
import { useFinanceStore } from '../stores/finance-store';

// ---------------------------------------------------------------------------
// Context Types
// ---------------------------------------------------------------------------

interface FinanceContextValue {
  /** Currently active finance product */
  activeProduct: FinanceProduct;
  /** Switch to a different finance product */
  switchProduct: (product: FinanceProduct) => void;
  /** Module configuration */
  config: typeof FINANCE_CONFIG;
  /** Product-specific settings */
  productSettings: typeof PRODUCT_SETTINGS[FinanceProduct];
  /** Whether the module is ready / hydrated */
  isReady: boolean;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const FinanceContext = createContext<FinanceContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider Component
// ---------------------------------------------------------------------------

interface FinanceProviderProps {
  children: React.ReactNode;
  /** Initial product to activate (defaults to config default) */
  initialProduct?: FinanceProduct;
}

export function FinanceProvider({ children, initialProduct }: FinanceProviderProps) {
  const {
    activeProduct,
    setActiveProduct,
    isHydrated,
  } = useFinanceStore();

  const switchProduct = useCallback(
    (product: FinanceProduct) => {
      setActiveProduct(product);
    },
    [setActiveProduct]
  );

  // On mount, set initial product if provided and store is not yet hydrated
  React.useEffect(() => {
    if (initialProduct && !isHydrated) {
      setActiveProduct(initialProduct);
    }
  }, [initialProduct, isHydrated, setActiveProduct]);

  const value = useMemo<FinanceContextValue>(
    () => ({
      activeProduct,
      switchProduct,
      config: FINANCE_CONFIG,
      productSettings: PRODUCT_SETTINGS[activeProduct],
      isReady: isHydrated,
    }),
    [activeProduct, switchProduct, isHydrated]
  );

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useFinanceContext(): FinanceContextValue {
  const ctx = useContext(FinanceContext);
  if (!ctx) {
    throw new Error('useFinanceContext must be used within a FinanceProvider');
  }
  return ctx;
}
