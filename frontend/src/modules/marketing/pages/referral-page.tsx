'use client';

import { UsersRound } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ROIDashboard } from '@/modules/marketing/components/analytics';

export function ReferralPage() {
  return (
    <MarketingPageShell
      title="Referral"
      description="Track and manage your referral programs"
      icon={<UsersRound className="h-6 w-6 text-teal-600" />}
      addLabel="New Referral Program"
    >
      <ROIDashboard />
    </MarketingPageShell>
  );
}
