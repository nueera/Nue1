// @ts-nocheck
'use client';

import { Award } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ROIDashboard } from '@/modules/marketing/components/analytics';

export function LoyaltyPage() {
  return (
    <MarketingPageShell
      title="Loyalty"
      description="Manage customer loyalty programs and rewards"
      icon={<Award className="h-6 w-6 text-amber-600" />}
      addLabel="New Loyalty Program"
    >
      <ROIDashboard />
    </MarketingPageShell>
  );
}
