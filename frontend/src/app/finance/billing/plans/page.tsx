'use client';

import { BookOpen } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BillingPlansPage() {
  return (
    <FinancePageShell
      title="Plans"
      description="Configure subscription plans and tiers"
      icon={<BookOpen className="h-6 w-6 text-violet-600" />}
      addLabel="New Plan"
    />
  );
}
