import { useSyncExternalStore, useCallback, useRef } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/** Ordered list of breakpoints from smallest to largest */
const BREAKPOINT_ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/** Default breakpoint for SSR — we assume desktop-lg as a safe default */
const SSR_DEFAULT_BREAKPOINT: Breakpoint = 'lg';
const SSR_DEFAULT_WIDTH = 1024;

/** Debounce delay for resize events (ms) */
const DEBOUNCE_MS = 150;

/**
 * Determine the current breakpoint name from a pixel width.
 */
function getBreakpointFromWidth(width: number): Breakpoint {
  // Iterate from largest to smallest; first match wins
  for (let i = BREAKPOINT_ORDER.length - 1; i >= 0; i--) {
    const bp = BREAKPOINT_ORDER[i];
    if (width >= BREAKPOINTS[bp]) {
      return bp;
    }
  }
  return 'xs';
}

// ---------------------------------------------------------------
// Global debounced width tracker (shared across hook instances)
// Uses matchMedia when available for efficient boundary-only
// updates, falls back to resize events otherwise.
// ---------------------------------------------------------------

let listenersCount = 0;
let cachedWidth: number | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const listenerSet = new Set<() => void>();

function notifyListeners() {
  for (const listener of listenerSet) {
    listener();
  }
}

function handleWidthChange() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    const newWidth = window.innerWidth;
    if (newWidth !== cachedWidth) {
      cachedWidth = newWidth;
      notifyListeners();
    }
  }, DEBOUNCE_MS);
}

function subscribe(callback: () => void): () => void {
  listenerSet.add(callback);
  listenersCount++;

  // Set up global listeners on first subscription
  if (listenersCount === 1) {
    cachedWidth = window.innerWidth;

    if (typeof window.matchMedia === 'function') {
      // Use matchMedia for efficient boundary-crossing detection
      const mqls: MediaQueryList[] = [];
      const handlers: Array<() => void> = [];

      for (const bp of BREAKPOINT_ORDER) {
        const minWidth = BREAKPOINTS[bp];
        if (minWidth === 0) continue;

        const mql = window.matchMedia(`(min-width: ${minWidth}px)`);
        const handler = handleWidthChange;
        mql.addEventListener('change', handler);
        mqls.push(mql);
        handlers.push(handler);
      }

      // Store cleanup references
      subscribe._mqls = mqls;
      subscribe._mqlHandlers = handlers;
    } else {
      // Fallback to resize event
      window.addEventListener('resize', handleWidthChange);
      subscribe._usingResize = true;
    }
  }

  return () => {
    listenerSet.delete(callback);
    listenersCount--;

    // Clean up global listeners when all subscribers are gone
    if (listenersCount === 0) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }

      if (subscribe._mqls && subscribe._mqlHandlers) {
        for (let i = 0; i < subscribe._mqls.length; i++) {
          subscribe._mqls[i].removeEventListener('change', subscribe._mqlHandlers[i]);
        }
        subscribe._mqls = null;
        subscribe._mqlHandlers = null;
      }

      if (subscribe._usingResize) {
        window.removeEventListener('resize', handleWidthChange);
        subscribe._usingResize = false;
      }

      cachedWidth = null;
    }
  };
}

// Store cleanup references on the subscribe function for shared access
subscribe._mqls = null as MediaQueryList[] | null;
subscribe._mqlHandlers = null as Array<() => void> | null;
subscribe._usingResize = false;

function getSnapshot(): number {
  if (cachedWidth === null) {
    cachedWidth = window.innerWidth;
  }
  return cachedWidth;
}

function getServerSnapshot(): number {
  return SSR_DEFAULT_WIDTH;
}

interface UseBreakpointReturn {
  /** Current breakpoint name */
  breakpoint: Breakpoint;
  /** Current viewport width in pixels */
  width: number;
  /** Returns true if the current viewport is at or above the given breakpoint */
  isAbove: (bp: Breakpoint) => boolean;
  /** Returns true if the current viewport is below the given breakpoint */
  isBelow: (bp: Breakpoint) => boolean;
}

/**
 * useBreakpoint — Responsive breakpoint detection hook.
 *
 * Features:
 * - Returns the current breakpoint name matching Tailwind defaults
 * - Provides `isAbove()` and `isBelow()` helper functions
 * - Returns the current `width` in pixels
 * - SSR-safe: defaults to 'lg' (1024px) on the server
 * - Debounces resize events (150ms) to avoid layout thrashing
 * - Uses `matchMedia` for efficient listening when available,
 *   falling back to `resize` events otherwise
 * - Uses `useSyncExternalStore` for optimal React 18+ concurrent rendering
 *
 * @example
 * ```tsx
 * const { breakpoint, isAbove, isBelow } = useBreakpoint();
 *
 * if (isBelow('md')) {
 *   // Render mobile layout
 * }
 *
 * if (isAbove('xl')) {
 *   // Render wide desktop layout
 * }
 * ```
 */
export function useBreakpoint(): UseBreakpointReturn {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const breakpoint = width === SSR_DEFAULT_WIDTH && typeof window === 'undefined'
    ? SSR_DEFAULT_BREAKPOINT
    : getBreakpointFromWidth(width);

  const isAbove = useCallback(
    (bp: Breakpoint): boolean => {
      return width >= BREAKPOINTS[bp];
    },
    [width]
  );

  const isBelow = useCallback(
    (bp: Breakpoint): boolean => {
      return width < BREAKPOINTS[bp];
    },
    [width]
  );

  return { breakpoint, width, isAbove, isBelow };
}
