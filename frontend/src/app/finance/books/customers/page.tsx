'use client';

import { Users } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BooksCustomersPage() {
  return (
    <FinancePageShell
      title="Customers"
      description="Manage your customer contacts and balances"
      icon={<Users className="h-6 w-6 text-emerald-600" />}
      addLabel="New Customer"
    />
  );
}
