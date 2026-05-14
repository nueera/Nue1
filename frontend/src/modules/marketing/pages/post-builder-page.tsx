// @ts-nocheck
'use client';

import { Share2 } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { SocialPostComposer } from '@/modules/marketing/components/social-campaigns';

export function PostBuilderPage() {
  return (
    <MarketingPageShell
      title="Post Builder"
      description="Compose and schedule a social media post"
      icon={<Share2 className="h-6 w-6 text-purple-600" />}
      addLabel="Schedule Post"
    >
      <SocialPostComposer />
    </MarketingPageShell>
  );
}
