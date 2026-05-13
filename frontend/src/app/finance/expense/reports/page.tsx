'use client';

import { FileBarChart } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function ExpenseReportsPage() {
  return (
    <FinancePageShell
      title="Expense Reports"
      description="Create and submit expense reports"
      icon={<FileBarChart className="h-6 w-6 text-violet-600" />}
      addLabel="New Report"
    />
  );
}
