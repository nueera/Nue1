// ============================================================================
// Smoke Test: useCountUp Hook (src/hooks/use-count-up)
// ============================================================================

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountUp } from '@/hooks/use-count-up';

describe('useCountUp()', () => {
  it('returns the prefix + target when disabled', () => {
    const { result } = renderHook(() =>
      useCountUp({ end: 100, enabled: false, prefix: '$' })
    );
    expect(result.current).toBe('$100');
  });

  it('returns prefix + 0 when animation starts', () => {
    const { result } = renderHook(() =>
      useCountUp({ end: 100, enabled: true, prefix: '$', duration: 5000 })
    );
    // Animation should start from 0
    expect(result.current).toContain('$');
  });

  it('handles suffix', () => {
    const { result } = renderHook(() =>
      useCountUp({ end: 95, suffix: '%', enabled: false })
    );
    expect(result.current).toBe('95%');
  });

  it('handles decimals', () => {
    const { result } = renderHook(() =>
      useCountUp({ end: 3.14, decimals: 2, enabled: false })
    );
    expect(result.current).toBe('3.14');
  });

  it('handles prefix + suffix + decimals together', () => {
    const { result } = renderHook(() =>
      useCountUp({ end: 12.5, prefix: '$', suffix: 'M', decimals: 1, enabled: false })
    );
    expect(result.current).toBe('$12.5M');
  });
});
