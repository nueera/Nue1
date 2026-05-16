'use client';

import { Share2 } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { SocialCalendar } from '@/modules/marketing/components/social-campaigns';

export function SocialCalendarPage() {
  return (
    <MarketingPageShell
      title="Social Calendar"
      description="Plan and schedule your social media posts"
      icon={<Share2 className="h-6 w-6 text-purple-600" />}
      addLabel="New Post"
    >
      <SocialCalendar />
    </MarketingPageShell>
  );
}
