'use client';

import { Link2 } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function CheckoutLinksPage() {
  return (
    <FinancePageShell
      title="Payment Links"
      description="Generate shareable payment links"
      icon={<Link2 className="h-6 w-6 text-violet-600" />}
      addLabel="New Link"
    />
  );
}
