'use client';

import { Building2 } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BooksBankingPage() {
  return (
    <FinancePageShell
      title="Banking"
      description="Manage bank accounts and reconcile transactions"
      icon={<Building2 className="h-6 w-6 text-sky-600" />}
      addLabel="Add Account"
    />
  );
}
