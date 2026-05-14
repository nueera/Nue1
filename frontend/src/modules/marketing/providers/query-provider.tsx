// @ts-nocheck
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// ---------------------------------------------------------------------------
// Marketing Query Provider
// Same pattern as Finance's query-provider.tsx
// ---------------------------------------------------------------------------

export function MarketingQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes — matches ERP, CRM, Finance
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0, // Matches CRM, Finance
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
