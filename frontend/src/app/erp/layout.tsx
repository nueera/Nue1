'use client';

import { type ReactNode } from 'react';
import { ERPLayout } from '@/modules/erp/design-system/layouts/erp-layout';

export default function ErpLayout({ children }: { children: ReactNode }) {
  return (
    <ERPLayout>{children}</ERPLayout>
  );
}
