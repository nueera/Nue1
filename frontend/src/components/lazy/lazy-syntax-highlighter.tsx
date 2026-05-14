'use client';

// ============================================================================
// Lazy Syntax Highlighter
// Dynamic import for react-syntax-highlighter — a ~300 KB bundle (including
// language definitions and theme styles). Use this wrapper instead of importing
// SyntaxHighlighter directly.
//
// Usage:
//   import { LazySyntaxHighlighter } from '@/components/lazy/lazy-syntax-highlighter';
//   <LazySyntaxHighlighter language="typescript" style={vscDarkPlus}>{code}</LazySyntaxHighlighter>
// ============================================================================

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const LazySyntaxHighlighter = dynamic(
  () =>
    import('react-syntax-highlighter/dist/esm/prism').then(
      (mod) => mod.default
    ),
  {
    loading: () => (
      <div className="space-y-2 p-4 border rounded-lg bg-muted/50">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    ),
    ssr: false,
  }
);

export { LazySyntaxHighlighter };

/**
 * Re-export common styles as named exports so consumers can do:
 *   import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
 * Styles are tiny (a few KB) so they can be imported statically.
 */
export { vscDarkPlus, vs2015, atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
