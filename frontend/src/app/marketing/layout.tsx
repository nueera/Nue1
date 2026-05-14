'use client';

import { type ReactNode } from 'react';
import { MarketingProvider } from '@/modules/marketing/providers/marketing-provider';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName="Marketing" moduleColor="bg-module-marketing">
      <MarketingProvider>{children}</MarketingProvider>
    </ModuleErrorBoundary>
  );
}
