// ============================================================================
// Shared Format Utilities
// Extracted from 128+ duplicate module utils.ts files.
// Each Finance domain had its own formatDocumentNumber/prettifyStatus clone.
// ============================================================================

/**
 * Format a document number with a prefix (e.g., "INV-001", "PO-042").
 * Replaces the duplicate `formatXxxNumber()` functions across all finance domains.
 */
export function formatDocumentNumber(num: string, prefix: string): string {
  if (!prefix) return num;
  return `${prefix}-${num}`;
}

/**
 * Convert a snake_case or SCREAMING_SNAKE_CASE string to human-readable Title Case.
 * Replaces the duplicate `getXxxStatusLabel()` functions across all finance domains.
 *
 * @example prettifyStatus('in_progress') → 'In Progress'
 * @example prettifyStatus('PENDING_REVIEW') → 'Pending Review'
 */
export function prettifyStatus(status: string): string {
  if (!status) return '';
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Format a number as currency using Intl.NumberFormat.
 * Uses the user's locale by default.
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a percentage value with specified decimal places.
 */
export function formatPercentage(
  value: number,
  decimals: number = 1
): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a large number with compact notation (e.g., 1.2K, 3.4M).
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

/**
 * Format a date string to a human-readable format.
 * Returns '—' for nullish values to avoid "Invalid Date" rendering.
 */
export function formatDate(
  date: string | Date | null | undefined,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '—';

  switch (format) {
    case 'long':
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'relative': {
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    case 'short':
    default:
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
  }
}

/**
 * Truncate a string to a maximum length, adding ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number = 50): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + '…';
}

/**
 * Get initials from a name (e.g., "John Doe" → "JD").
 */
export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
