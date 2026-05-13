'use client';

import { Mail } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { EmailCampaignList } from '@/modules/marketing/components/email-campaigns/email-campaign-list';

export default function EmailCampaignsPage() {
  return (
    <MarketingPageShell
      title="Email Campaigns"
      description="Create and manage email marketing campaigns"
      icon={<Mail className="h-6 w-6 text-blue-600" />}
      addLabel="New Email Campaign"
    >
      <EmailCampaignList />
    </MarketingPageShell>
  );
}
