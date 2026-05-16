// ============================================================================
// Financial Date Helper Utilities
// Fiscal year, due date, aging, and financial period calculations.
// ============================================================================

import { FISCAL_YEAR_MONTHS } from '../constants/finance-common';
import type { FiscalYearMonth } from '../constants/finance-common';

// ---------------------------------------------------------------------------
// Fiscal Year
// ---------------------------------------------------------------------------

/**
 * Get the fiscal year for a given date based on the fiscal year start month.
 *
 * @example
 * // If fiscal year starts in April:
 * getFiscalYear(new Date('2024-03-15'), 'April')  // 2023 (FY23-24)
 * getFiscalYear(new Date('2024-04-01'), 'April')  // 2024 (FY24-25)
 */
export function getFiscalYear(date: Date, fiscalYearStart: FiscalYearMonth = 'January'): number {
  const startMonthIndex = FISCAL_YEAR_MONTHS.indexOf(fiscalYearStart);
  const dateMonth = date.getMonth(); // 0-based

  if (dateMonth >= startMonthIndex) {
    return date.getFullYear();
  }
  return date.getFullYear() - 1;
}

/**
 * Get the fiscal year label (e.g., "FY 2024" or "FY 2024-25").
 *
 * @example
 * getFiscalYearLabel(new Date('2024-06-15'), 'April')  // "FY 2024-25"
 * getFiscalYearLabel(new Date('2024-06-15'), 'January')  // "FY 2024"
 */
export function getFiscalYearLabel(
  date: Date,
  fiscalYearStart: FiscalYearMonth = 'January'
): string {
  const fy = getFiscalYear(date, fiscalYearStart);

  if (fiscalYearStart === 'January') {
    return `FY ${fy}`;
  }

  const nextYear = (fy + 1) % 100;
  return `FY ${fy}-${String(nextYear).padStart(2, '0')}`;
}

/**
 * Get the start and end dates of a fiscal year.
 *
 * @example
 * getFiscalYearRange(2024, 'April')
 * // { start: Date(2024-04-01), end: Date(2025-03-31) }
 */
export function getFiscalYearRange(
  fiscalYear: number,
  fiscalYearStart: FiscalYearMonth = 'January'
): { start: Date; end: Date } {
  const startMonthIndex = FISCAL_YEAR_MONTHS.indexOf(fiscalYearStart);

  const start = new Date(fiscalYear, startMonthIndex, 1);
  const end = new Date(fiscalYear + 1, startMonthIndex, 0); // Last day of previous month

  return { start, end };
}

/**
 * Get the current fiscal year's quarter for a given date.
 * Returns 1-4.
 */
export function getFiscalQuarter(
  date: Date,
  fiscalYearStart: FiscalYearMonth = 'January'
): number {
  const startMonthIndex = FISCAL_YEAR_MONTHS.indexOf(fiscalYearStart);
  const dateMonth = date.getMonth();
  const adjustedMonth = (dateMonth - startMonthIndex + 12) % 12;
  return Math.floor(adjustedMonth / 3) + 1;
}

// ---------------------------------------------------------------------------
// Due Date Calculation
// ---------------------------------------------------------------------------

/**
 * Calculate the due date based on a date and payment term days.
 *
 * @example
 * calculateDueDate(new Date('2024-01-15'), 30)  // Date(2024-02-14)
 * calculateDueDate(new Date('2024-01-15'), 0)   // Date(2024-01-15) (due on receipt)
 */
export function calculateDueDate(issueDate: Date, paymentTermDays: number): Date {
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + paymentTermDays);
  return dueDate;
}

/**
 * Calculate due date with "end of month" logic.
 *
 * @example
 * calculateDueDateEndOfMonth(new Date('2024-01-15'), 30)
 * // Last day of February 2024 (Feb 29, 2024)
 */
export function calculateDueDateEndOfMonth(issueDate: Date, additionalDays: number = 0): Date {
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + additionalDays);
  // Set to last day of the month
  dueDate.setMonth(dueDate.getMonth() + 1, 0);
  return dueDate;
}

/**
 * Calculate due date with "end of next month" logic.
 */
export function calculateDueDateEndOfNextMonth(issueDate: Date): Date {
  const dueDate = new Date(issueDate);
  dueDate.setMonth(dueDate.getMonth() + 2, 0); // Last day of next month
  return dueDate;
}

// ---------------------------------------------------------------------------
// Aging
// ---------------------------------------------------------------------------

export type AgingBucket = 'current' | '1-30' | '31-60' | '61-90' | '90+';

/**
 * Calculate the aging bucket for a given due date relative to a reference date.
 *
 * @example
 * getAgingBucket(new Date('2024-01-01'), new Date('2024-01-15'))  // "1-30"
 * getAgingBucket(new Date('2024-02-01'), new Date('2024-01-15'))  // "current"
 * getAgingBucket(new Date('2023-10-01'), new Date('2024-01-15'))  // "90+"
 */
export function getAgingBucket(dueDate: Date, referenceDate: Date = new Date()): AgingBucket {
  const diffMs = referenceDate.getTime() - dueDate.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'current';
  if (diffDays <= 30) return '1-30';
  if (diffDays <= 60) return '31-60';
  if (diffDays <= 90) return '61-90';
  return '90+';
}

/**
 * Calculate the number of days overdue for a given due date.
 * Returns 0 if not overdue.
 */
export function getDaysOverdue(dueDate: Date, referenceDate: Date = new Date()): number {
  const diffMs = referenceDate.getTime() - dueDate.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Calculate the number of days until a due date.
 * Returns 0 if already past due.
 */
export function getDaysUntilDue(dueDate: Date, referenceDate: Date = new Date()): number {
  const diffMs = dueDate.getTime() - referenceDate.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

// ---------------------------------------------------------------------------
// Date Range Helpers
// ---------------------------------------------------------------------------

export interface DateRange {
  from: Date;
  to: Date;
}

/**
 * Get the date range for a specific month.
 */
export function getMonthRange(year: number, month: number): DateRange {
  const from = new Date(year, month, 1);
  const to = new Date(year, month + 1, 0);
  return { from, to };
}

/**
 * Get the date range for a specific quarter.
 */
export function getQuarterRange(year: number, quarter: 1 | 2 | 3 | 4): DateRange {
  const startMonth = (quarter - 1) * 3;
  const from = new Date(year, startMonth, 1);
  const to = new Date(year, startMonth + 3, 0);
  return { from, to };
}

/**
 * Get the date range for a full year.
 */
export function getYearRange(year: number): DateRange {
  return {
    from: new Date(year, 0, 1),
    to: new Date(year, 11, 31),
  };
}

/**
 * Check if a date is within a range.
 */
export function isDateInRange(date: Date, range: DateRange): boolean {
  return date >= range.from && date <= range.to;
}

// ---------------------------------------------------------------------------
// Formatting Helpers
// ---------------------------------------------------------------------------

/**
 * Format a date as a financial period string (e.g., "Jan 2024", "Q1 2024").
 */
export function formatFinancialPeriod(
  date: Date,
  format: 'month' | 'quarter' | 'year' = 'month'
): string {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = date.getFullYear();

  switch (format) {
    case 'month':
      return `${monthNames[date.getMonth()]} ${year}`;
    case 'quarter': {
      const q = Math.floor(date.getMonth() / 3) + 1;
      return `Q${q} ${year}`;
    }
    case 'year':
      return `${year}`;
  }
}

/**
 * Get the number of business days between two dates (excluding weekends).
 */
export function getBusinessDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}
