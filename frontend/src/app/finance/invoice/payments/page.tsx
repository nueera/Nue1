'use client';

import { DollarSign } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function InvoicePaymentsPage() {
  return (
    <FinancePageShell
      title="Payments"
      description="Record and track customer payments"
      icon={<DollarSign className="h-6 w-6 text-sky-600" />}
      addLabel="Record Payment"
    />
  );
}
