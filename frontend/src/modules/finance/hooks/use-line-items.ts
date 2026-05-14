// @ts-nocheck
'use client';

// ============================================================================
// useLineItems Hook
// Line item CRUD operations for invoices, estimates, bills, etc.
// ============================================================================

import { useState, useCallback, useMemo } from 'react';
import type { LineItem, Money, TaxRate } from '../types';
import { DEFAULT_TAX_RATES } from '../constants/finance-common';

// ---------------------------------------------------------------------------
// Line Item Form Values
// ---------------------------------------------------------------------------

export interface LineItemFormValues {
  item: string;
  description?: string;
  quantity: number;
  rateAmount: number;
  rateCurrency: string;
  taxId?: string;
}

// ---------------------------------------------------------------------------
// Hook Return Type
// ---------------------------------------------------------------------------

interface UseLineItemsReturn {
  /** Current line items */
  items: LineItem[];
  /** Add a new line item */
  addItem: (values: LineItemFormValues) => void;
  /** Update an existing line item */
  updateItem: (id: string, values: Partial<LineItemFormValues>) => void;
  /** Remove a line item */
  removeItem: (id: string) => void;
  /** Reorder line items */
  reorderItems: (fromIndex: number, toIndex: number) => void;
  /** Duplicate a line item */
  duplicateItem: (id: string) => void;
  /** Clear all line items */
  clearItems: () => void;
  /** Set all items (for loading from server) */
  setItems: (items: LineItem[]) => void;
  /** Get subtotal (sum of all item totals before tax) */
  subtotal: Money;
  /** Get total tax amount */
  totalTax: Money;
  /** Get grand total (subtotal + tax) */
  grandTotal: Money;
  /** Number of items */
  itemCount: number;
  /** Whether there are any items */
  hasItems: boolean;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLineItems(
  defaultCurrency: string = 'USD'
): UseLineItemsReturn {
  const [items, setItemsState] = useState<LineItem[]>([]);

  const computeLineTotal = useCallback(
    (quantity: number, rateAmount: number, taxRate?: TaxRate): Money => {
      const lineTotal = quantity * rateAmount;
      let taxAmount = 0;

      if (taxRate) {
        taxAmount = (lineTotal * taxRate.rate) / 100;
        // Round to 2 decimal places
        taxAmount = Math.round(taxAmount * 100) / 100;
      }

      return {
        amount: Math.round((lineTotal + taxAmount) * 100) / 100,
        currency: defaultCurrency,
      };
    },
    [defaultCurrency]
  );

  const findTaxRate = useCallback((taxId?: string): TaxRate | undefined => {
    if (!taxId) return undefined;
    return DEFAULT_TAX_RATES.find((r) => r.id === taxId);
  }, []);

  const addItem = useCallback(
    (values: LineItemFormValues) => {
      const tax = findTaxRate(values.taxId);
      const rate: Money = { amount: values.rateAmount, currency: values.rateCurrency || defaultCurrency };
      const total = computeLineTotal(values.quantity, values.rateAmount, tax);

      const newItem: LineItem = {
        id: generateItemId(),
        item: values.item,
        description: values.description,
        quantity: values.quantity,
        rate,
        tax,
        total,
      };

      setItemsState((prev) => [...prev, newItem]);
    },
    [defaultCurrency, computeLineTotal, findTaxRate]
  );

  const updateItem = useCallback(
    (id: string, values: Partial<LineItemFormValues>) => {
      setItemsState((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;

          const updated = { ...item };
          if (values.item !== undefined) updated.item = values.item;
          if (values.description !== undefined) updated.description = values.description;
          if (values.quantity !== undefined) updated.quantity = values.quantity;
          if (values.rateAmount !== undefined) {
            updated.rate = { ...updated.rate, amount: values.rateAmount };
          }
          if (values.rateCurrency !== undefined) {
            updated.rate = { ...updated.rate, currency: values.rateCurrency };
          }
          if (values.taxId !== undefined) {
            updated.tax = findTaxRate(values.taxId);
          }

          // Recompute total
          updated.total = computeLineTotal(
            updated.quantity,
            updated.rate.amount,
            updated.tax
          );

          return updated;
        })
      );
    },
    [computeLineTotal, findTaxRate]
  );

  const removeItem = useCallback((id: string) => {
    setItemsState((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const reorderItems = useCallback((fromIndex: number, toIndex: number) => {
    setItemsState((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const duplicateItem = useCallback(
    (id: string) => {
      setItemsState((prev) => {
        const index = prev.findIndex((item) => item.id === id);
        if (index === -1) return prev;

        const original = prev[index];
        const duplicate: LineItem = {
          ...original,
          id: generateItemId(),
        };

        const next = [...prev];
        next.splice(index + 1, 0, duplicate);
        return next;
      });
    },
    []
  );

  const clearItems = useCallback(() => {
    setItemsState([]);
  }, []);

  const setItems = useCallback((newItems: LineItem[]) => {
    setItemsState(newItems);
  }, []);

  // Computed values
  const subtotal = useMemo<Money>(() => {
    const amount = items.reduce((sum, item) => sum + item.rate.amount * item.quantity, 0);
    return { amount: Math.round(amount * 100) / 100, currency: defaultCurrency };
  }, [items, defaultCurrency]);

  const totalTax = useMemo<Money>(() => {
    const amount = items.reduce((sum, item) => {
      if (!item.tax) return sum;
      const lineTotal = item.rate.amount * item.quantity;
      const taxAmt = (lineTotal * item.tax.rate) / 100;
      return sum + Math.round(taxAmt * 100) / 100;
    }, 0);
    return { amount: Math.round(amount * 100) / 100, currency: defaultCurrency };
  }, [items, defaultCurrency]);

  const grandTotal = useMemo<Money>(() => {
    const amount = items.reduce((sum, item) => sum + item.total.amount, 0);
    return { amount: Math.round(amount * 100) / 100, currency: defaultCurrency };
  }, [items, defaultCurrency]);

  return useMemo(
    () => ({
      items,
      addItem,
      updateItem,
      removeItem,
      reorderItems,
      duplicateItem,
      clearItems,
      setItems,
      subtotal,
      totalTax,
      grandTotal,
      itemCount: items.length,
      hasItems: items.length > 0,
    }),
    [
      items,
      addItem,
      updateItem,
      removeItem,
      reorderItems,
      duplicateItem,
      clearItems,
      setItems,
      subtotal,
      totalTax,
      grandTotal,
    ]
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let itemCounter = 0;

function generateItemId(): string {
  itemCounter += 1;
  return `li_${Date.now()}_${itemCounter}`;
}
