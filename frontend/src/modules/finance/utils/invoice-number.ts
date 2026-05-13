// ============================================================================
// Invoice Number Generation Utilities
// INV-001, EST-001, BILL-001, etc.
// ============================================================================

import { DOCUMENT_PREFIXES } from '../config/finance.config';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DocumentType = keyof typeof DOCUMENT_PREFIXES;

// ---------------------------------------------------------------------------
// Sequential Number Generation
// ---------------------------------------------------------------------------

/**
 * Generate a sequential document number.
 *
 * @example
 * generateDocumentNumber('invoice', 42)      // "INV-042"
 * generateDocumentNumber('estimate', 7)       // "EST-007"
 * generateDocumentNumber('salesOrder', 1001)  // "SO-1001"
 */
export function generateDocumentNumber(
  type: DocumentType,
  sequence: number,
  options?: {
    /** Number of digits to pad (default: auto-based on sequence) */
    padLength?: number;
    /** Custom prefix override */
    prefix?: string;
    /** Date prefix (e.g., "2024-01") */
    datePrefix?: string;
  }
): string {
  const prefix = options?.prefix ?? DOCUMENT_PREFIXES[type];
  const padLength = options?.padLength ?? Math.max(3, String(sequence).length);
  const padded = String(sequence).padStart(padLength, '0');

  if (options?.datePrefix) {
    return `${prefix}${options.datePrefix}-${padded}`;
  }

  return `${prefix}${padded}`;
}

// ---------------------------------------------------------------------------
// Parse Document Number
// ---------------------------------------------------------------------------

export interface ParsedDocumentNumber {
  type: DocumentType | 'unknown';
  prefix: string;
  sequence: number;
  datePrefix?: string;
}

/**
 * Parse a document number into its components.
 *
 * @example
 * parseDocumentNumber('INV-042')
 * // { type: 'invoice', prefix: 'INV-', sequence: 42 }
 *
 * parseDocumentNumber('EST-2024-01-007')
 * // { type: 'estimate', prefix: 'EST-', sequence: 7, datePrefix: '2024-01' }
 */
export function parseDocumentNumber(docNumber: string): ParsedDocumentNumber {
  // Try to match known prefixes
  for (const [type, prefix] of Object.entries(DOCUMENT_PREFIXES)) {
    if (docNumber.startsWith(prefix)) {
      const remainder = docNumber.slice(prefix.length);

      // Check for date prefix pattern (YYYY-MM)
      const dateMatch = remainder.match(/^(\d{4}-\d{2})-(\d+)$/);
      if (dateMatch) {
        return {
          type: type as DocumentType,
          prefix,
          sequence: parseInt(dateMatch[2], 10),
          datePrefix: dateMatch[1],
        };
      }

      // Simple sequential number
      const seqMatch = remainder.match(/^0*(\d+)$/);
      if (seqMatch) {
        return {
          type: type as DocumentType,
          prefix,
          sequence: parseInt(seqMatch[1], 10),
        };
      }
    }
  }

  // Unknown format — try to extract what we can
  const genericMatch = docNumber.match(/^([A-Z]+-)(.+)$/);
  if (genericMatch) {
    const seq = parseInt(genericMatch[2].replace(/\D/g, ''), 10);
    return {
      type: 'unknown',
      prefix: genericMatch[1],
      sequence: isNaN(seq) ? 0 : seq,
    };
  }

  return {
    type: 'unknown',
    prefix: '',
    sequence: 0,
  };
}

// ---------------------------------------------------------------------------
// Next Number Helpers
// ---------------------------------------------------------------------------

/**
 * Calculate the next sequence number from a list of existing document numbers.
 *
 * @example
 * getNextSequence(['INV-001', 'INV-002', 'INV-003'])  // 4
 * getNextSequence([])                                   // 1
 */
export function getNextSequence(existingNumbers: string[]): number {
  if (existingNumbers.length === 0) return 1;

  const sequences = existingNumbers
    .map((num) => parseDocumentNumber(num).sequence)
    .filter((s) => s > 0);

  if (sequences.length === 0) return 1;

  return Math.max(...sequences) + 1;
}

// ---------------------------------------------------------------------------
// Document Number Validation
// ---------------------------------------------------------------------------

/**
 * Validate a document number format.
 *
 * @example
 * isValidDocumentNumber('INV-001')  // true
 * isValidDocumentNumber('INV-0')    // true
 * isValidDocumentNumber('INV-')     // false
 * isValidDocumentNumber('XYZ')      // false
 */
export function isValidDocumentNumber(docNumber: string): boolean {
  if (!docNumber || docNumber.length < 2) return false;

  // Must start with a letter prefix followed by a dash
  if (!/^[A-Z]+-/.test(docNumber)) return false;

  // Must end with at least one digit
  if (!/\d$/.test(docNumber)) return false;

  return true;
}

// ---------------------------------------------------------------------------
// Formatted Number Helpers
// ---------------------------------------------------------------------------

/**
 * Generate a year-based document number.
 *
 * @example
 * generateYearBasedNumber('invoice', 42, 2024)  // "INV-2024-042"
 */
export function generateYearBasedNumber(
  type: DocumentType,
  sequence: number,
  year: number,
  options?: { padLength?: number; prefix?: string }
): string {
  return generateDocumentNumber(type, sequence, {
    ...options,
    datePrefix: String(year),
  });
}

/**
 * Generate a month-based document number.
 *
 * @example
 * generateMonthBasedNumber('invoice', 42, 2024, 1)  // "INV-2024-01-042"
 */
export function generateMonthBasedNumber(
  type: DocumentType,
  sequence: number,
  year: number,
  month: number,
  options?: { padLength?: number; prefix?: string }
): string {
  const monthStr = String(month).padStart(2, '0');
  return generateDocumentNumber(type, sequence, {
    ...options,
    datePrefix: `${year}-${monthStr}`,
  });
}
