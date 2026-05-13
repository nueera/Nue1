'use client';

import { Shield } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ComplianceDashboard } from '@/modules/marketing/components/compliance/compliance-dashboard';

export default function CompliancePage() {
  return (
    <MarketingPageShell
      title="Compliance"
      description="GDPR, consent management, and compliance monitoring"
      icon={<Shield className="h-6 w-6 text-red-600" />}
      addLabel="Review Compliance"
    >
      <ComplianceDashboard />
    </MarketingPageShell>
  );
}
