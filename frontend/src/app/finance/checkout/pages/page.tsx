'use client';

import { Globe } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function CheckoutPagesPage() {
  return (
    <FinancePageShell
      title="Payment Pages"
      description="Create and customize hosted payment pages"
      icon={<Globe className="h-6 w-6 text-sky-600" />}
      addLabel="New Page"
    />
  );
}
