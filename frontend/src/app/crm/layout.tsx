'use client';

import { type ReactNode } from 'react';
import { CrmProvider } from '@/modules/crm/core/providers';
import { CrmErrorBoundary } from '@/modules/crm/core/error-boundary';
import { CrmLayout } from '@/modules/crm/design-system/layouts';

export default function CrmAppLayout({ children }: { children: ReactNode }) {
  return (
    <CrmErrorBoundary>
      <CrmProvider>
        <CrmLayout>
          {children}
        </CrmLayout>
      </CrmProvider>
    </CrmErrorBoundary>
  );
}
