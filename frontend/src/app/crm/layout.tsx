'use client';

import { type ReactNode } from 'react';
import { CrmErrorBoundary } from '@/modules/crm/core/error-boundary';
import { CrmLayout } from '@/modules/crm/design-system/layouts';

export default function CrmAppLayout({ children }: { children: ReactNode }) {
  return (
    <CrmErrorBoundary>
      <CrmLayout>
        {children}
      </CrmLayout>
    </CrmErrorBoundary>
  );
}
