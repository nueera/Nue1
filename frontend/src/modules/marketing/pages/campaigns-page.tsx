// @ts-nocheck
'use client';

import { Megaphone } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { EmailCampaignList } from '@/modules/marketing/components/email-campaigns';

export function CampaignsPage() {
  return (
    <MarketingPageShell
      title="Campaigns"
      description="Manage your marketing campaigns"
      icon={<Megaphone className="h-6 w-6 text-emerald-600" />}
      addLabel="New Campaign"
    >
      <EmailCampaignList />
    </MarketingPageShell>
  );
}
