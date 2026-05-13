'use client';

import { ClipboardCheck } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function CommerceOrdersPage() {
  return (
    <FinancePageShell
      title="Orders"
      description="Track and manage customer orders"
      icon={<ClipboardCheck className="h-6 w-6 text-sky-600" />}
      addLabel="New Order"
    />
  );
}
