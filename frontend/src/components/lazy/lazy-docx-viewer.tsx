'use client';

// ============================================================================
// Lazy Docx Viewer
// Dynamic import placeholder for any future docx/document-viewer library.
// When a docx viewer is integrated, replace the placeholder import below.
//
// Usage:
//   import { LazyDocxViewer } from '@/components/lazy/lazy-docx-viewer';
//   <LazyDocxViewer url={fileUrl} />
// ============================================================================

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Placeholder — replace with the actual docx viewer package when integrated
// Example: () => import('docx-preview').then(mod => mod.renderAsync)
const LazyDocxViewer = dynamic(
  () =>
    Promise.resolve(
      () =>
        function DocxViewerPlaceholder() {
          return (
            <div className="flex items-center justify-center p-8 border rounded-lg bg-muted/50 text-muted-foreground">
              Document viewer coming soon
            </div>
          );
        }
    ),
  {
    loading: () => (
      <div className="space-y-3 p-4 border rounded-lg">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-48 w-full" />
      </div>
    ),
    ssr: false,
  }
);

export { LazyDocxViewer };
