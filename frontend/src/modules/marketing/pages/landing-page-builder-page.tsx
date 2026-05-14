// @ts-nocheck
'use client';

import { Globe } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { LandingPageBuilder } from '@/modules/marketing/components/landing-pages';

export function LandingPageBuilderPage() {
  return (
    <MarketingPageShell
      title="Landing Page Builder"
      description="Design and build your landing page"
      icon={<Globe className="h-6 w-6 text-indigo-600" />}
      addLabel="Publish"
    >
      <LandingPageBuilder />
    </MarketingPageShell>
  );
}
