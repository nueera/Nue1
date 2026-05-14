// ============================================================================
// Smoke Test: Shared Format Utilities (src/lib/format)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { formatDocumentNumber, prettifyStatus, formatCurrency } from '@/lib/format';

describe('formatDocumentNumber()', () => {
  it('formats with prefix and number', () => {
    expect(formatDocumentNumber('INV-001', 'INV')).toBe('INV-INV-001');
  });

  it('handles empty prefix', () => {
    expect(formatDocumentNumber('001', '')).toBe('001');
  });
});

describe('prettifyStatus()', () => {
  it('converts snake_case to Title Case', () => {
    expect(prettifyStatus('in_progress')).toBe('In Progress');
  });

  it('handles single word', () => {
    expect(prettifyStatus('active')).toBe('Active');
  });

  it('handles already pretty string', () => {
    expect(prettifyStatus('Active')).toBe('Active');
  });

  it('handles empty string', () => {
    expect(prettifyStatus('')).toBe('');
  });
});

describe('formatCurrency()', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.56)).toContain('1,234.56');
  });

  it('formats with specified currency', () => {
    const result = formatCurrency(1000, 'EUR');
    expect(result).toContain('1,000');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toContain('0.00');
  });
});
