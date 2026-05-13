'use client';

import { Banknote } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function PayrollPayRunsPage() {
  return (
    <FinancePageShell
      title="Pay Runs"
      description="Process and manage payroll runs"
      icon={<Banknote className="h-6 w-6 text-violet-600" />}
      addLabel="New Pay Run"
    />
  );
}
