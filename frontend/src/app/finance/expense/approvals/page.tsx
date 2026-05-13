'use client';

import { CheckCircle2 } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function ExpenseApprovalsPage() {
  return (
    <FinancePageShell
      title="Approvals"
      description="Review and approve expense requests"
      icon={<CheckCircle2 className="h-6 w-6 text-emerald-600" />}
      addLabel="Review All"
    />
  );
}
