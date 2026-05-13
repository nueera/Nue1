'use client';

import { RefreshCw } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BillingSubscriptionsPage() {
  return (
    <FinancePageShell
      title="Subscriptions"
      description="Manage active subscriptions and billing cycles"
      icon={<RefreshCw className="h-6 w-6 text-sky-600" />}
      addLabel="New Subscription"
    />
  );
}
