'use client';

import { type ReactNode } from 'react';
import { FinanceShell } from '@/modules/finance/components/layout/finance-shell';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

export default function FinanceLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName="Finance" moduleColor="bg-module-finance">
      <FinanceShell>{children}</FinanceShell>
    </ModuleErrorBoundary>
  );
}
