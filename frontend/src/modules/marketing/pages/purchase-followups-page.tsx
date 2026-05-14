// @ts-nocheck
'use client';

import { RefreshCw } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { PurchaseFollowupList } from '@/modules/marketing/components/ecommerce';

export function PurchaseFollowupsPage() {
  return (
    <MarketingPageShell
      title="Purchase Follow-ups"
      description="Automate post-purchase engagement and follow-ups"
      icon={<RefreshCw className="h-6 w-6 text-blue-600" />}
      addLabel="New Follow-up"
    >
      <PurchaseFollowupList />
    </MarketingPageShell>
  );
}
