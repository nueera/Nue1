'use client';

import { type ReactNode } from 'react';
import { ERPLayout } from '@/modules/erp/design-system/layouts/erp-layout';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

export default function ErpLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName="ERP" moduleColor="bg-module-erp">
      <ERPLayout>{children}</ERPLayout>
    </ModuleErrorBoundary>
  );
}
