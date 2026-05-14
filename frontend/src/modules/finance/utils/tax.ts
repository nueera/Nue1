// @ts-nocheck
// ============================================================================
// Tax Calculation Utilities
// calculateTax, taxBreakdown, and related tax computation helpers.
// ============================================================================

import type { Money, TaxRate, LineItem } from '../types';
import { roundToPrecision } from './currency';

// ---------------------------------------------------------------------------
// Core Tax Calculation
// ---------------------------------------------------------------------------

/**
 * Calculate the tax amount on a given base amount.
 *
 * @example
 * calculateTaxAmount(1000, { rate: 10, type: 'exclusive' })  // 100
 * calculateTaxAmount(1000, { rate: 20, type: 'inclusive' })  // 166.67
 */
export function calculateTaxAmount(
  baseAmount: number,
  taxRate: TaxRate
): number {
  if (taxRate.type === 'exclusive') {
    // Tax is added on top of the base amount
    const raw = (baseAmount * taxRate.rate) / 100;
    return Math.round(raw * 100) / 100;
  }

  // Inclusive: tax is included in the base amount
  // baseAmount = netAmount + (netAmount * rate / 100)
  // netAmount = baseAmount / (1 + rate/100)
  // taxAmount = baseAmount - netAmount
  const netAmount = baseAmount / (1 + taxRate.rate / 100);
  const taxAmount = baseAmount - netAmount;
  return Math.round(taxAmount * 100) / 100;
}

// ---------------------------------------------------------------------------
// Tax Breakdown
// ---------------------------------------------------------------------------

export interface TaxBreakdownItem {
  taxRate: TaxRate;
  taxableAmount: number;
  taxAmount: number;
}

export interface TaxCalculationResult {
  /** Subtotal before tax (for exclusive) or after extracting tax (for inclusive) */
  subtotal: number;
  /** Total tax amount */
  totalTax: number;
  /** Grand total */
  total: number;
  /** Detailed breakdown by tax rate */
  breakdown: TaxBreakdownItem[];
}

/**
 * Calculate tax for a single amount with one tax rate.
 *
 * @example
 * calculateTax(1000, { id: 'vat10', name: 'VAT 10%', rate: 10, type: 'exclusive' })
 * // { subtotal: 1000, totalTax: 100, total: 1100, breakdown: [...] }
 */
export function calculateTax(
  amount: number,
  taxRate: TaxRate,
  currency: string = 'USD'
): TaxCalculationResult {
  const taxAmount = calculateTaxAmount(amount, taxRate);

  const breakdown: TaxBreakdownItem[] = [
    {
      taxRate,
      taxableAmount: amount,
      taxAmount,
    },
  ];

  if (taxRate.type === 'exclusive') {
    return {
      subtotal: amount,
      totalTax: taxAmount,
      total: roundToPrecision(amount + taxAmount, currency),
      breakdown,
    };
  }

  // Inclusive
  const netAmount = amount - taxAmount;
  return {
    subtotal: roundToPrecision(netAmount, currency),
    totalTax: taxAmount,
    total: amount,
    breakdown,
  };
}

/**
 * Calculate tax for a line item.
 */
export function calculateLineItemTax(
  item: LineItem
): TaxCalculationResult {
  if (!item.tax) {
    return {
      subtotal: item.rate.amount * item.quantity,
      totalTax: 0,
      total: item.total.amount,
      breakdown: [],
    };
  }

  const baseAmount = item.rate.amount * item.quantity;
  return calculateTax(baseAmount, item.tax, item.total.currency);
}

/**
 * Calculate tax for multiple line items, aggregating by tax rate.
 */
export function calculateMultipleItemsTax(
  items: LineItem[],
  currency: string = 'USD'
): TaxCalculationResult {
  if (items.length === 0) {
    return { subtotal: 0, totalTax: 0, total: 0, breakdown: [] };
  }

  let subtotal = 0;
  let totalTax = 0;
  const breakdownMap = new Map<string, TaxBreakdownItem>();

  for (const item of items) {
    const baseAmount = item.rate.amount * item.quantity;
    subtotal += baseAmount;

    if (item.tax) {
      const taxAmt = calculateTaxAmount(baseAmount, item.tax);
      totalTax += taxAmt;

      const existing = breakdownMap.get(item.tax.id);
      if (existing) {
        existing.taxableAmount += baseAmount;
        existing.taxAmount += taxAmt;
      } else {
        breakdownMap.set(item.tax.id, {
          taxRate: item.tax,
          taxableAmount: baseAmount,
          taxAmount: taxAmt,
        });
      }
    }
  }

  const breakdown = Array.from(breakdownMap.values());
  // Round each breakdown item
  for (const b of breakdown) {
    b.taxAmount = Math.round(b.taxAmount * 100) / 100;
    b.taxableAmount = Math.round(b.taxableAmount * 100) / 100;
  }

  return {
    subtotal: roundToPrecision(subtotal, currency),
    totalTax: roundToPrecision(totalTax, currency),
    total: roundToPrecision(subtotal + totalTax, currency),
    breakdown,
  };
}

// ---------------------------------------------------------------------------
// Compound Tax
// ---------------------------------------------------------------------------

/**
 * Calculate compound tax (tax on tax).
 * Non-compound rates are applied first, then compound rates on the cumulative amount.
 */
export function calculateCompoundTax(
  amount: number,
  taxRates: TaxRate[],
  currency: string = 'USD'
): TaxCalculationResult {
  if (taxRates.length === 0) {
    return { subtotal: amount, totalTax: 0, total: amount, breakdown: [] };
  }

  // Sort: non-compound first, then compound
  const sorted = [...taxRates].sort((a, b) => {
    if (a.compound && !b.compound) return 1;
    if (!a.compound && b.compound) return -1;
    return 0;
  });

  const breakdown: TaxBreakdownItem[] = [];
  let runningAmount = amount;
  let totalTax = 0;

  for (const rate of sorted) {
    const taxable = rate.compound ? runningAmount : amount;
    const taxAmt = calculateTaxAmount(taxable, rate);
    totalTax += taxAmt;
    runningAmount += taxAmt;

    breakdown.push({
      taxRate: rate,
      taxableAmount: Math.round(taxable * 100) / 100,
      taxAmount: taxAmt,
    });
  }

  return {
    subtotal: amount,
    totalTax: roundToPrecision(totalTax, currency),
    total: roundToPrecision(amount + totalTax, currency),
    breakdown,
  };
}

// ---------------------------------------------------------------------------
// Tax Display Helpers
// ---------------------------------------------------------------------------

/**
 * Format a tax rate for display.
 *
 * @example
 * formatTaxRate({ name: 'VAT 20%', rate: 20 })  // "VAT 20% (20%)"
 */
export function formatTaxRate(taxRate: TaxRate): string {
  const typeLabel = taxRate.type === 'inclusive' ? 'incl.' : 'excl.';
  return `${taxRate.name} (${taxRate.rate}% ${typeLabel})`;
}

/**
 * Get a short label for a tax rate.
 *
 * @example
 * getTaxLabel({ name: 'VAT 20%', rate: 20 })  // "20%"
 */
export function getTaxLabel(taxRate: TaxRate): string {
  return `${taxRate.rate}%`;
}
