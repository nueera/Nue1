'use client';

// ============================================================================
// Lazy MDX Editor
// Dynamic import for @mdxeditor/editor — a ~500 KB bundle that should never
// be included in the initial page load. Use this wrapper instead of importing
// MDXEditor directly.
//
// Usage:
//   import { LazyMDXEditor } from '@/components/lazy/lazy-mdx-editor';
//   <LazyMDXEditor markdown={md} onChange={setMd} />
// ============================================================================

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const MDXEditor = dynamic(
  () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
  {
    loading: () => (
      <div className="space-y-3 p-4 border rounded-lg">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-32 w-full" />
      </div>
    ),
    ssr: false,
  }
);

export { MDXEditor as LazyMDXEditor };
