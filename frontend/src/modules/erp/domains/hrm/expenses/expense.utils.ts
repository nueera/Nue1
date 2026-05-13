import { MILEAGE_RATE_PER_KM, PER_DIEM_RATES } from './constants';

/**
 * Calculate mileage reimbursement based on kilometers traveled.
 */
export function calcMileage(km: number, ratePerKm: number = MILEAGE_RATE_PER_KM): number {
  return Math.round(km * ratePerKm * 100) / 100;
}

/**
 * Calculate per diem allowance for travel days.
 */
export function calcPerDiem(
  days: number,
  type: 'domestic' | 'international' | 'metro' = 'domestic',
): number {
  const rate = PER_DIEM_RATES[type];
  return Math.round(days * rate * 100) / 100;
}

/**
 * Format an expense amount as a currency string (INR).
 */
export function fmtExpenseAmount(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate the total of an array of expense items.
 */
export function calcExpenseTotal(items: Array<{ amount: number }>): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

/**
 * Calculate the number of travel days between two dates (inclusive).
 */
export function calcTravelDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (24 * 60 * 60 * 1000)) + 1;
}
