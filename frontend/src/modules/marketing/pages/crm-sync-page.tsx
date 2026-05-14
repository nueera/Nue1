// @ts-nocheck
'use client';

import { RefreshCw } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { CrmSyncConfig } from '@/modules/marketing/components/crm-sync';

export function CrmSyncPage() {
  return (
    <MarketingPageShell
      title="CRM Sync"
      description="Configure and monitor CRM synchronization"
      icon={<RefreshCw className="h-6 w-6 text-blue-600" />}
      addLabel="Sync Now"
    >
      <CrmSyncConfig />
    </MarketingPageShell>
  );
}
