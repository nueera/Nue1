'use client';

// ============================================================================
// Root Error Boundary
// Catches any unhandled errors in the entire app. This is the last line of
// defense before the user sees a blank white screen.
//
// Key safety features:
//   - Error messages are sanitized — no internal details, stack traces, or
//     sensitive tokens ever leak to the user.
//   - In development, the raw error is logged to the console for debugging.
//   - In production, only a generic message is shown.
//   - The error.digest (Next.js hash) is displayed as a reference ID so users
//     can report it to support.
// ============================================================================

import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { sanitizeErrorMessage } from '@/components/providers/query-provider';

export default function RootErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log full error in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('[RootErrorBoundary]', error);
  } else {
    // In production, only log a sanitized version
    console.error('[RootErrorBoundary]', error.message, error.digest ?? '');
  }

  const displayMessage = sanitizeErrorMessage(
    error.message || 'An unexpected error occurred.'
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background">
      <div className="w-20 h-20 rounded-full bg-status-danger/10 flex items-center justify-center mb-6">
        <AlertTriangle className="h-10 w-10 text-status-danger" />
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">
        Something went wrong
      </h1>

      <p className="text-sm text-muted-foreground max-w-md mb-2">
        {displayMessage}
      </p>

      {error.digest && (
        <p className="text-xs text-muted-foreground/60 mb-6">
          Reference: {error.digest}
        </p>
      )}

      {!error.digest && <div className="mb-6" />}

      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>

        <a
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Home className="h-4 w-4" />
          Go Home
        </a>
      </div>
    </div>
  );
}
