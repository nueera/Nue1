// @ts-nocheck
'use client';

// ============================================================================
// useTaxCalculation Hook
// Tax computation, breakdown, and display utilities.
// ============================================================================

import { useCallback, useMemo } from 'react';
import type { Money, TaxRate, LineItem } from '../types';
import { DEFAULT_TAX_RATES } from '../constants/finance-common';

// ---------------------------------------------------------------------------
// Tax Calculation Result
// ---------------------------------------------------------------------------

export interface TaxBreakdown {
  taxRate: TaxRate;
  taxableAmount: Money;
  taxAmount: Money;
}

export interface TaxCalculationResult {
  /** Subtotal before tax */
  subtotal: Money;
  /** Total tax amount */
  totalTax: Money;
  /** Grand total (subtotal + tax for exclusive, subtotal for inclusive) */
  grandTotal: Money;
  /** Detailed tax breakdown per rate */
  breakdown: TaxBreakdown[];
  /** Whether any tax is compound */
  hasCompoundTax: boolean;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseTaxCalculationReturn {
  /** Calculate tax on a single amount */
  calculateTax: (amount: Money, taxRate: TaxRate) => TaxCalculationResult;
  /** Calculate tax for a line item */
  calculateLineItemTax: (item: LineItem) => TaxCalculationResult;
  /** Calculate tax for multiple line items (aggregated) */
  calculateMultipleItemsTax: (items: LineItem[]) => TaxCalculationResult;
  /** Get the default tax rates */
  defaultTaxRates: TaxRate[];
  /** Get a tax rate by ID */
  getTaxRateById: (id: string) => TaxRate | undefined;
  /** Calculate compound tax (tax on tax) */
  calculateCompoundTax: (amount: Money, taxRates: TaxRate[]) => TaxCalculationResult;
}

export function useTaxCalculation(): UseTaxCalculationReturn {
  const calculateTax = useCallback(
    (amount: Money, taxRate: TaxRate): TaxCalculationResult => {
      const currency = amount.currency;
      const taxAmount = computeTaxAmount(amount.amount, taxRate);

      const breakdown: TaxBreakdown[] = [
        {
          taxRate,
          taxableAmount: amount,
          taxAmount: { amount: taxAmount, currency },
        },
      ];

      if (taxRate.type === 'exclusive') {
        return {
          subtotal: amount,
          totalTax: { amount: taxAmount, currency },
          grandTotal: { amount: amount.amount + taxAmount, currency },
          breakdown,
          hasCompoundTax: false,
        };
      }

      // Inclusive: tax is included in the amount
      const subtotalAmount = amount.amount - taxAmount;
      return {
        subtotal: { amount: subtotalAmount, currency },
        totalTax: { amount: taxAmount, currency },
        grandTotal: amount,
        breakdown,
        hasCompoundTax: false,
      };
    },
    []
  );

  const calculateLineItemTax = useCallback(
    (item: LineItem): TaxCalculationResult => {
      if (!item.tax) {
        return {
          subtotal: item.total,
          totalTax: { amount: 0, currency: item.total.currency },
          grandTotal: item.total,
          breakdown: [],
          hasCompoundTax: false,
        };
      }
      return calculateTax(item.total, item.tax);
    },
    [calculateTax]
  );

  const calculateMultipleItemsTax = useCallback(
    (items: LineItem[]): TaxCalculationResult => {
      if (items.length === 0) {
        return {
          subtotal: { amount: 0, currency: 'USD' },
          totalTax: { amount: 0, currency: 'USD' },
          grandTotal: { amount: 0, currency: 'USD' },
          breakdown: [],
          hasCompoundTax: false,
        };
      }

      const currency = items[0].total.currency;
      let subtotalAmount = 0;
      let totalTaxAmount = 0;
      const breakdownMap = new Map<string, TaxBreakdown>();

      for (const item of items) {
        const itemTotal = item.total.amount;
        subtotalAmount += itemTotal;

        if (item.tax) {
          const taxAmt = computeTaxAmount(itemTotal, item.tax);
          totalTaxAmount += taxAmt;

          const existing = breakdownMap.get(item.tax.id);
          if (existing) {
            existing.taxableAmount = {
              amount: existing.taxableAmount.amount + itemTotal,
              currency,
            };
            existing.taxAmount = {
              amount: existing.taxAmount.amount + taxAmt,
              currency,
            };
          } else {
            breakdownMap.set(item.tax.id, {
              taxRate: item.tax,
              taxableAmount: { amount: itemTotal, currency },
              taxAmount: { amount: taxAmt, currency },
            });
          }
        }
      }

      const breakdown = Array.from(breakdownMap.values());
      const hasCompoundTax = breakdown.some((b) => b.taxRate.compound);

      return {
        subtotal: { amount: subtotalAmount, currency },
        totalTax: { amount: totalTaxAmount, currency },
        grandTotal: { amount: subtotalAmount + totalTaxAmount, currency },
        breakdown,
        hasCompoundTax,
      };
    },
    []
  );

  const getTaxRateById = useCallback((id: string): TaxRate | undefined => {
    return DEFAULT_TAX_RATES.find((r) => r.id === id);
  }, []);

  const calculateCompoundTax = useCallback(
    (amount: Money, taxRates: TaxRate[]): TaxCalculationResult => {
      const currency = amount.currency;
      const breakdown: TaxBreakdown[] = [];
      let runningAmount = amount.amount;
      let totalTaxAmount = 0;

      // Sort: non-compound first, then compound
      const sorted = [...taxRates].sort((a, b) => {
        if (a.compound && !b.compound) return 1;
        if (!a.compound && b.compound) return -1;
        return 0;
      });

      for (const rate of sorted) {
        const taxable = rate.compound ? runningAmount : amount.amount;
        const taxAmt = computeTaxAmount(taxable, rate);
        totalTaxAmount += taxAmt;
        runningAmount += taxAmt;

        breakdown.push({
          taxRate: rate,
          taxableAmount: { amount: taxable, currency },
          taxAmount: { amount: taxAmt, currency },
        });
      }

      return {
        subtotal: amount,
        totalTax: { amount: totalTaxAmount, currency },
        grandTotal: { amount: amount.amount + totalTaxAmount, currency },
        breakdown,
        hasCompoundTax: taxRates.some((r) => r.compound),
      };
    },
    []
  );

  return useMemo(
    () => ({
      calculateTax,
      calculateLineItemTax,
      calculateMultipleItemsTax,
      defaultTaxRates: DEFAULT_TAX_RATES,
      getTaxRateById,
      calculateCompoundTax,
    }),
    [
      calculateTax,
      calculateLineItemTax,
      calculateMultipleItemsTax,
      getTaxRateById,
      calculateCompoundTax,
    ]
  );
}

// ---------------------------------------------------------------------------
// Pure helper (not a hook)
// ---------------------------------------------------------------------------

function computeTaxAmount(amount: number, taxRate: TaxRate): number {
  const raw = (amount * taxRate.rate) / 100;
  // Round to 2 decimal places (standard financial rounding)
  return Math.round(raw * 100) / 100;
}
