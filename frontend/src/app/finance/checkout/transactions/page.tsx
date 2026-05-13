'use client';

import { Receipt } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function CheckoutTransactionsPage() {
  return (
    <FinancePageShell
      title="Transactions"
      description="View and manage checkout transactions"
      icon={<Receipt className="h-6 w-6 text-emerald-600" />}
      addLabel="Export"
    />
  );
}
