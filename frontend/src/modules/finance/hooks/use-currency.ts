// @ts-nocheck
'use client';

// ============================================================================
// useCurrency Hook
// Currency formatting, conversion, and display utilities.
// ============================================================================

import { useCallback, useMemo } from 'react';
import type { Money, Currency } from '../types';
import { CURRENCIES, getCurrencyByCode, DEFAULT_CURRENCY } from '../constants/finance-common';

interface UseCurrencyReturn {
  /** Format a Money object to a display string */
  formatMoney: (money: Money) => string;
  /** Format a raw amount with a currency code */
  formatAmount: (amount: number, currencyCode: string) => string;
  /** Get the currency symbol for a code */
  getSymbol: (code: string) => string;
  /** Get the full currency object for a code */
  getCurrency: (code: string) => Currency | undefined;
  /** All supported currencies */
  currencies: Currency[];
  /** Default currency */
  defaultCurrency: Currency;
  /** Parse a formatted money string back to a number */
  parseAmount: (formatted: string) => number;
  /** Convert between currencies (uses exchange rates if available) */
  convert: (money: Money, targetCurrency: string, rate?: number) => Money;
  /** Get precision (decimal places) for a currency */
  getPrecision: (code: string) => number;
}

export function useCurrency(): UseCurrencyReturn {
  const formatMoney = useCallback((money: Money): string => {
    const currency = getCurrencyByCode(money.currency) || DEFAULT_CURRENCY;
    const { symbol, precision } = currency;

    const formatted = Math.abs(money.amount).toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });

    const sign = money.amount < 0 ? '-' : '';
    return `${sign}${symbol}${formatted}`;
  }, []);

  const formatAmount = useCallback((amount: number, currencyCode: string): string => {
    return formatMoney({ amount, currency: currencyCode });
  }, [formatMoney]);

  const getSymbol = useCallback((code: string): string => {
    const currency = getCurrencyByCode(code);
    return currency?.symbol ?? code;
  }, []);

  const getCurrency = useCallback((code: string): Currency | undefined => {
    return getCurrencyByCode(code);
  }, []);

  const parseAmount = useCallback((formatted: string): number => {
    // Remove currency symbols, commas, and spaces
    const cleaned = formatted
      .replace(/[^\d.\-]/g, '')
      .replace(/(\..*)\./g, '$1'); // Remove duplicate dots
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  const convert = useCallback(
    (money: Money, targetCurrency: string, rate?: number): Money => {
      if (money.currency === targetCurrency) {
        return money;
      }

      const exchangeRate = rate ?? 1; // Default to 1:1 if no rate provided
      return {
        amount: money.amount * exchangeRate,
        currency: targetCurrency,
      };
    },
    []
  );

  const getPrecision = useCallback((code: string): number => {
    const currency = getCurrencyByCode(code);
    return currency?.precision ?? 2;
  }, []);

  return useMemo(
    () => ({
      formatMoney,
      formatAmount,
      getSymbol,
      getCurrency,
      currencies: CURRENCIES,
      defaultCurrency: DEFAULT_CURRENCY,
      parseAmount,
      convert,
      getPrecision,
    }),
    [formatMoney, formatAmount, getSymbol, getCurrency, parseAmount, convert, getPrecision]
  );
}
