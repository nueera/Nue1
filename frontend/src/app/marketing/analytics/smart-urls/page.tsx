'use client';

import { Link2 } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { SmartUrlList } from '@/modules/marketing/components/web-tracking';

export default function SmartUrlsPage() {
  return (
    <MarketingPageShell
      title="Smart URLs"
      description="Create and track smart URLs with UTM parameters"
      icon={<Link2 className="h-6 w-6 text-teal-600" />}
      addLabel="New Smart URL"
    >
      <SmartUrlList />
    </MarketingPageShell>
  );
}
