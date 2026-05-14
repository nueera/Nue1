// ============================================================================
// Smoke Test: Utility Functions (src/lib/)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn() — className merger', () => {
  it('merges multiple class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('handles conditional classes via clsx', () => {
    expect(cn('base', false && 'hidden', 'active')).toBe('base active');
  });

  it('deduplicates Tailwind classes via twMerge', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('');
  });

  it('handles undefined and null gracefully', () => {
    expect(cn('base', undefined, null, 'extra')).toBe('base extra');
  });
});
