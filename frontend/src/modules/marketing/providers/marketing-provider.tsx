// @ts-nocheck
'use client';

import { MarketingQueryProvider } from './query-provider';
import { MarketingShell } from '../components/layout/marketing-shell';

// ---------------------------------------------------------------------------
// Marketing Provider
// Wraps all Marketing module providers + layout shell
// Same pattern as Finance's finance-provider.tsx
// ---------------------------------------------------------------------------

export function MarketingProvider({ children }: { children: React.ReactNode }) {
  return (
    <MarketingQueryProvider>
      <MarketingShell>
        {children}
      </MarketingShell>
    </MarketingQueryProvider>
  );
}
