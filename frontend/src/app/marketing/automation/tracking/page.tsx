'use client';

import { Eye } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { SmartUrlList } from '@/modules/marketing/components/web-tracking';

export default function WebTrackingPage() {
  return (
    <MarketingPageShell
      title="Web Tracking"
      description="Track website visitors and page analytics"
      icon={<Eye className="h-6 w-6 text-indigo-600" />}
      addLabel="Add Tracking Code"
    >
      <SmartUrlList />
    </MarketingPageShell>
  );
}
