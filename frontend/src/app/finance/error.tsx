'use client';

import { AlertTriangle } from 'lucide-react';
import { sanitizeErrorMessage } from '@/components/providers/query-provider';

export default function FinanceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const displayMessage = sanitizeErrorMessage(
    error.message || 'An unexpected error occurred in the Finance module.'
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-status-danger/15 flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-status-danger" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h2>
      <p className="text-sm text-muted-foreground max-w-md mb-4">
        {displayMessage}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-module-finance text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Try Again
      </button>
    </div>
  );
}
