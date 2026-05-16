'use client';

import { FileText } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { TemplateGallery } from '@/modules/marketing/components/email-templates';

export function EmailTemplatesPage() {
  return (
    <MarketingPageShell
      title="Email Templates"
      description="Browse and manage your email templates"
      icon={<FileText className="h-6 w-6 text-blue-600" />}
      addLabel="New Template"
    >
      <TemplateGallery />
    </MarketingPageShell>
  );
}
