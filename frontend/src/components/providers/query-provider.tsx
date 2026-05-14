'use client';

// ============================================================================
// Global Query Provider
// Single QueryClientProvider at app root — replaces the 4 duplicate
// module-level providers (ERP, CRM, Finance, Marketing) that each created
// their own QueryClient with identical configuration.
//
// Includes global error handling:
//   - Query errors → logged + monitored (silent to user unless component handles)
//   - Mutation errors → logged + toast notification via sonner
// ============================================================================

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// ---------------------------------------------------------------------------
// Error sanitization — never expose internals to the user
// ---------------------------------------------------------------------------

const SENSITIVE_PATTERNS = [
  /api[_-]?key/i,
  /token/i,
  /password/i,
  /secret/i,
  /authorization/i,
  /cookie/i,
  /internal/i,
  /stack/i,
  /ECONNREFUSED/,
  /ENOTFOUND/,
  /ETIMEDOUT/,
];

/**
 * Sanitize an error message for safe display to end users.
 * Strips any information that could leak infrastructure details.
 */
export function sanitizeErrorMessage(message: string): string {
  for (const pattern of SENSITIVE_PATTERNS) {
    if (pattern.test(message)) {
      return 'An unexpected error occurred. Please try again.';
    }
  }

  // Truncate very long messages (likely stack traces or HTML)
  if (message.length > 200) {
    return 'An unexpected error occurred. Please try again.';
  }

  return message;
}

// ---------------------------------------------------------------------------
// Global error handlers
// ---------------------------------------------------------------------------

/** Global handler for query errors — silent to user, logged for observability */
function handleQueryError(error: Error) {
  if (process.env.NODE_ENV === 'production') {
    // TODO: Replace with Sentry / Datadog / LogRocket integration
    console.error('[QueryClient] Query error:', error.message);
  } else {
    console.error('[QueryClient] Query error:', error);
  }
}

/** Global handler for mutation errors — logged + toast via lazy sonner import */
function handleMutationError(error: Error) {
  if (process.env.NODE_ENV === 'production') {
    console.error('[QueryClient] Mutation error:', error.message);
  } else {
    console.error('[QueryClient] Mutation error:', error);
  }

  // Show a user-friendly toast for mutation failures.
  // Dynamic import avoids pulling sonner into the initial bundle.
  if (typeof window !== 'undefined') {
    import('sonner').then(({ toast }) => {
      toast.error(sanitizeErrorMessage(error.message || 'Action failed. Please try again.'));
    }).catch(() => {
      // sonter import failed silently — already logged above
    });
  }
}

// ---------------------------------------------------------------------------
// QueryClient factory
// ---------------------------------------------------------------------------

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
        onError: handleMutationError,
      },
    },
    queryCache: new QueryCache({
      onError: handleQueryError,
    }),
  });
}

// SSR safety: on the server each request gets its own QueryClient.
// On the browser we reuse a singleton so cached data persists across navigations.
let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useState(() => getQueryClient())[0];

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
