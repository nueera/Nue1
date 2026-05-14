// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { EmailComposer } from './email-composer';
import { EmailRecipientPicker } from './email-recipient-picker';
import { EmailSchedule } from './email-schedule';
import { EmailABTest } from './email-ab-test';
import { useCreateCampaign, useUpdateCampaign } from '@/modules/marketing/hooks/use-campaigns';
import type { Campaign } from '@/modules/marketing/types';
import { X } from 'lucide-react';

interface EmailCampaignFormProps {
  campaign?: Campaign;
  onSubmit?: (data: Record<string, unknown>) => void;
  onCancel: () => void;
  className?: string;
}

export function EmailCampaignForm({ campaign, onSubmit, onCancel, className }: EmailCampaignFormProps) {
  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();
  const [activeTab, setActiveTab] = useState('details');

  const [formData, setFormData] = useState({
    name: campaign?.name ?? '',
    subject: campaign?.subject ?? '',
    fromName: campaign?.fromName ?? '',
    fromEmail: campaign?.fromEmail ?? '',
    replyTo: '',
    contentHtml: '',
    audienceIds: [] as string[],
    segmentIds: [] as string[],
    scheduledAt: '',
    timezone: 'America/New_York',
    recurrence: 'once' as const,
    abTestId: '',
  });

  const isEditing = !!campaign;
  const isFormValid = formData.name && formData.subject && formData.fromName;

  const handleSave = async () => {
    try {
      if (isEditing && campaign) {
        await updateCampaign.mutateAsync({
          id: campaign.id,
          data: formData,
        });
      } else {
        await createCampaign.mutateAsync({
          ...formData,
          type: 'email',
          channel: 'email',
        });
      }
      onSubmit?.(formData);
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {isEditing ? 'Edit Email Campaign' : 'New Email Campaign'}
          </CardTitle>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
            <TabsTrigger value="recipients" className="text-xs">Recipients</TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs">Schedule</TabsTrigger>
            <TabsTrigger value="ab-test" className="text-xs">A/B Test</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label className="text-xs text-muted-foreground">Campaign Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Welcome Series"
                  className="h-9 mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs text-muted-foreground">Subject Line *</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                  placeholder="e.g. Welcome to our community!"
                  className="h-9 mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">From Name *</Label>
                <Input
                  value={formData.fromName}
                  onChange={(e) => setFormData((p) => ({ ...p, fromName: e.target.value }))}
                  placeholder="e.g. Acme Team"
                  className="h-9 mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">From Email</Label>
                <Input
                  value={formData.fromEmail}
                  onChange={(e) => setFormData((p) => ({ ...p, fromEmail: e.target.value }))}
                  placeholder="e.g. hello@acme.com"
                  type="email"
                  className="h-9 mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs text-muted-foreground">Reply-To Email</Label>
                <Input
                  value={formData.replyTo}
                  onChange={(e) => setFormData((p) => ({ ...p, replyTo: e.target.value }))}
                  placeholder="e.g. support@acme.com"
                  type="email"
                  className="h-9 mt-1"
                />
              </div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="mt-4">
            <EmailComposer
              value={formData.contentHtml}
              onChange={(html) => setFormData((p) => ({ ...p, contentHtml: html }))}
            />
          </TabsContent>

          {/* Recipients Tab */}
          <TabsContent value="recipients" className="mt-4">
            <EmailRecipientPicker
              selectedAudienceIds={formData.audienceIds}
              selectedSegmentIds={formData.segmentIds}
              onAudienceChange={(ids) => setFormData((p) => ({ ...p, audienceIds: ids }))}
              onSegmentChange={(ids) => setFormData((p) => ({ ...p, segmentIds: ids }))}
            />
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="mt-4">
            <EmailSchedule
              value={{
                date: formData.scheduledAt ? new Date(formData.scheduledAt) : undefined,
                time: '09:00',
                timezone: formData.timezone,
              }}
              onChange={(config) =>
                setFormData((p) => ({
                  ...p,
                  scheduledAt: config.date?.toISOString() ?? '',
                  timezone: config.timezone,
                }))
              }
            />
          </TabsContent>

          {/* A/B Test Tab */}
          <TabsContent value="ab-test" className="mt-4">
            <EmailABTest
              value={formData.abTestId}
              onChange={(id) => setFormData((p) => ({ ...p, abTestId: id }))}
            />
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSave}
            disabled={!isFormValid || createCampaign.isPending || updateCampaign.isPending}
          >
            {createCampaign.isPending || updateCampaign.isPending
              ? 'Saving...'
              : isEditing
                ? 'Update Campaign'
                : 'Create Campaign'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
