// @ts-nocheck
// ============================================================================
// Currency Utilities
// formatMoney, parseMoney, and related currency formatting helpers.
// ============================================================================

import type { Money, Currency } from '../types';
import { CURRENCIES, DEFAULT_CURRENCY, getCurrencyByCode } from '../constants/finance-common';

// ---------------------------------------------------------------------------
// Format Money
// ---------------------------------------------------------------------------

/**
 * Format a Money object into a human-readable string.
 *
 * @example
 * formatMoney({ amount: 1234.56, currency: 'USD' })  // "$1,234.56"
 * formatMoney({ amount: -500, currency: 'EUR' })       // "-\u20AC500.00"
 * formatMoney({ amount: 100000, currency: 'JPY' })     // "\u00A5100,000"
 */
export function formatMoney(money: Money): string {
  const currency = getCurrencyByCode(money.currency) || DEFAULT_CURRENCY;
  const { symbol, precision } = currency;

  const formatted = Math.abs(money.amount).toLocaleString('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  const sign = money.amount < 0 ? '-' : '';
  return `${sign}${symbol}${formatted}`;
}

/**
 * Format a Money object with currency code suffix.
 *
 * @example
 * formatMoneyWithCode({ amount: 1234.56, currency: 'USD' })  // "$1,234.56 USD"
 */
export function formatMoneyWithCode(money: Money): string {
  return `${formatMoney(money)} ${money.currency}`;
}

/**
 * Format a raw amount with a given currency code.
 *
 * @example
 * formatAmount(1234.56, 'USD')  // "$1,234.56"
 */
export function formatAmount(amount: number, currencyCode: string): string {
  return formatMoney({ amount, currency: currencyCode });
}

// ---------------------------------------------------------------------------
// Parse Money
// ---------------------------------------------------------------------------

/**
 * Parse a formatted money string back to a numeric amount.
 * Strips currency symbols, commas, and whitespace.
 *
 * @example
 * parseMoney("$1,234.56")   // 1234.56
 * parseMoney("\u20AC500,00")  // 500 (note: commas treated as non-decimal)
 * parseMoney("-$1,000.00")  // -1000
 */
export function parseMoney(formatted: string): number {
  // Remove currency symbols, letters, commas, and spaces
  const cleaned = formatted
    .replace(/[^\d.\-]/g, '')
    .replace(/(\..*)\./g, '$1'); // Remove duplicate dots

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// ---------------------------------------------------------------------------
// Currency Helpers
// ---------------------------------------------------------------------------

/**
 * Get the symbol for a currency code.
 *
 * @example
 * getCurrencySymbol('USD')  // "$"
 * getCurrencySymbol('EUR')  // "\u20AC"
 * getCurrencySymbol('XYZ')  // "XYZ"  (fallback to code)
 */
export function getCurrencySymbol(code: string): string {
  const currency = getCurrencyByCode(code);
  return currency?.symbol ?? code;
}

/**
 * Get the number of decimal places for a currency.
 *
 * @example
 * getCurrencyPrecision('USD')  // 2
 * getCurrencyPrecision('JPY')  // 0
 */
export function getCurrencyPrecision(code: string): number {
  const currency = getCurrencyByCode(code);
  return currency?.precision ?? 2;
}

/**
 * Round an amount to the correct precision for a currency.
 *
 * @example
 * roundToPrecision(123.456, 'USD')  // 123.46
 * roundToPrecision(123.456, 'JPY')  // 123
 */
export function roundToPrecision(amount: number, currencyCode: string): number {
  const precision = getCurrencyPrecision(currencyCode);
  const factor = Math.pow(10, precision);
  return Math.round(amount * factor) / factor;
}

/**
 * Convert between currencies using an exchange rate.
 *
 * @example
 * convertCurrency({ amount: 100, currency: 'USD' }, 'EUR', 0.85)
 * // { amount: 85, currency: 'EUR' }
 */
export function convertCurrency(
  money: Money,
  targetCurrency: string,
  exchangeRate: number
): Money {
  if (money.currency === targetCurrency) {
    return money;
  }
  return {
    amount: roundToPrecision(money.amount * exchangeRate, targetCurrency),
    currency: targetCurrency,
  };
}

/**
 * Check if a Money object has a zero amount.
 */
export function isZero(money: Money): boolean {
  return money.amount === 0;
}

/**
 * Check if a Money object has a negative amount.
 */
export function isNegative(money: Money): boolean {
  return money.amount < 0;
}

/**
 * Check if two Money objects are equal (same amount and currency).
 */
export function moneyEquals(a: Money, b: Money): boolean {
  return a.amount === b.amount && a.currency === b.currency;
}

/**
 * Add two Money objects (must be same currency).
 */
export function moneyAdd(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new Error(`Cannot add ${a.currency} and ${b.currency}`);
  }
  return { amount: roundToPrecision(a.amount + b.amount, a.currency), currency: a.currency };
}

/**
 * Subtract two Money objects (must be same currency).
 */
export function moneySubtract(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new Error(`Cannot subtract ${b.currency} from ${a.currency}`);
  }
  return { amount: roundToPrecision(a.amount - b.amount, a.currency), currency: a.currency };
}

/**
 * Multiply a Money object by a factor.
 */
export function moneyMultiply(money: Money, factor: number): Money {
  return {
    amount: roundToPrecision(money.amount * factor, money.currency),
    currency: money.currency,
  };
}

/**
 * Get all supported currencies.
 */
export function getAllCurrencies(): Currency[] {
  return [...CURRENCIES];
}
