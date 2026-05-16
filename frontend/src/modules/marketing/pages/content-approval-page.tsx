'use client';

import { CheckCircle2 } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';

export function ContentApprovalPage() {
  return (
    <MarketingPageShell
      title="Content Approval"
      description="Review and approve marketing content before publishing"
      icon={<CheckCircle2 className="h-6 w-6 text-emerald-600" />}
      addLabel="Submit for Review"
    />
  );
}
