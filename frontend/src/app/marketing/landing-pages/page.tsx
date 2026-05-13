'use client';

import { Globe } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { LandingPageList } from '@/modules/marketing/components/landing-pages/landing-page-list';

export default function LandingPagesPage() {
  return (
    <MarketingPageShell
      title="Landing Pages"
      description="Create and manage high-converting landing pages"
      icon={<Globe className="h-6 w-6 text-indigo-600" />}
      addLabel="New Landing Page"
    >
      <LandingPageList />
    </MarketingPageShell>
  );
}
