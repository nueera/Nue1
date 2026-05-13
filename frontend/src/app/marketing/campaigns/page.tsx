'use client';

import { Megaphone } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { EmailCampaignList } from '@/modules/marketing/components/email-campaigns/email-campaign-list';

export default function CampaignsListPage() {
  return (
    <MarketingPageShell
      title="Campaigns"
      description="Manage your marketing campaigns across all channels"
      icon={<Megaphone className="h-6 w-6 text-emerald-600" />}
      addLabel="New Campaign"
    >
      <EmailCampaignList />
    </MarketingPageShell>
  );
}
