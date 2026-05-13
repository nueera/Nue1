'use client';

import { Share2 } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { SocialCampaignList } from '@/modules/marketing/components/social-campaigns';

export default function SocialCampaignsPage() {
  return (
    <MarketingPageShell
      title="Social Campaigns"
      description="Manage your social media campaigns and posts"
      icon={<Share2 className="h-6 w-6 text-purple-600" />}
      addLabel="New Social Post"
    >
      <SocialCampaignList />
    </MarketingPageShell>
  );
}
