'use client';

import { type ReactNode } from 'react';
import { MarketingShell } from '@/modules/marketing/components/layout/marketing-shell';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName="Marketing" moduleColor="bg-module-marketing">
      <MarketingShell>{children}</MarketingShell>
    </ModuleErrorBoundary>
  );
}
