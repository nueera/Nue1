'use client';

import { FileBarChart } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BooksReportsPage() {
  return (
    <FinancePageShell
      title="Reports"
      description="Financial reports and analytics"
      icon={<FileBarChart className="h-6 w-6 text-violet-600" />}
      addLabel="New Report"
    />
  );
}
