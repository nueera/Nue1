'use client';

import { MessageSquare } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { SmsCampaignList } from '@/modules/marketing/components/sms-campaigns';

export function SmsCampaignsPage() {
  return (
    <MarketingPageShell
      title="SMS Campaigns"
      description="Create and manage SMS marketing campaigns"
      icon={<MessageSquare className="h-6 w-6 text-emerald-600" />}
      addLabel="New SMS Campaign"
    >
      <SmsCampaignList />
    </MarketingPageShell>
  );
}
