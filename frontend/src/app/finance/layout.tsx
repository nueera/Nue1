'use client';

import { type ReactNode } from 'react';
import { FinanceShell } from '@/modules/finance/components/layout/finance-shell';

export default function FinanceLayout({ children }: { children: ReactNode }) {
  return <FinanceShell>{children}</FinanceShell>;
}
