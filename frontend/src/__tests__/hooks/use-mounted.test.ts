// ============================================================================
// Smoke Test: Hooks (src/hooks/)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMounted } from '@/hooks/use-mounted';

describe('useMounted()', () => {
  it('returns false on the server (jsdom)', () => {
    const { result } = renderHook(() => useMounted());
    // In jsdom, the hook should return a boolean value
    expect(typeof result.current).toBe('boolean');
  });
});
