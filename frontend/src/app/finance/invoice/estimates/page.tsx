'use client';

import { FileText } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function InvoiceEstimatesPage() {
  return (
    <FinancePageShell
      title="Estimates"
      description="Create and send professional estimates"
      icon={<FileText className="h-6 w-6 text-violet-600" />}
      addLabel="New Estimate"
    />
  );
}
