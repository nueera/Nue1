'use client';

import { Receipt } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function InvoiceInvoicesPage() {
  return (
    <FinancePageShell
      title="Invoices"
      description="Create, send, and track invoices"
      icon={<Receipt className="h-6 w-6 text-emerald-600" />}
      addLabel="New Invoice"
    />
  );
}
