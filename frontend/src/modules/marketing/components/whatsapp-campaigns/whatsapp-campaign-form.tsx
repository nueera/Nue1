'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WhatsappComposer } from './whatsapp-composer';
import { SchedulePicker, type ScheduleConfig } from '../shared/schedule-picker';
import { useCreateCampaign, useUpdateCampaign } from '@/modules/marketing/hooks';
import type { Campaign } from '@/modules/marketing/types';
import { X } from 'lucide-react';

interface WhatsappCampaignFormProps {
  campaign?: Campaign;
  onSubmit?: (data: Record<string, unknown>) => void;
  onCancel: () => void;
  className?: string;
}

export function WhatsappCampaignForm({ campaign, onSubmit, onCancel, className }: WhatsappCampaignFormProps) {
  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();
  const [activeTab, setActiveTab] = useState('details');

  const [formData, setFormData] = useState({
    name: campaign?.name ?? '',
    templateName: '',
    templateLanguage: 'en',
    headerText: '',
    bodyText: '',
    footerText: '',
    mediaUrl: '',
    audienceIds: [] as string[],
    scheduledAt: '',
    timezone: 'America/New_York',
  });

  const isEditing = !!campaign;

  const handleSave = async () => {
    try {
      if (isEditing && campaign) {
        await updateCampaign.mutateAsync({ id: campaign.id, data: formData });
      } else {
        await createCampaign.mutateAsync({ ...formData, type: 'whatsapp', channel: 'whatsapp' });
      }
      onSubmit?.(formData);
    } catch { /* error handled */ }
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{isEditing ? 'Edit WhatsApp Campaign' : 'New WhatsApp Campaign'}</CardTitle>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
            <TabsTrigger value="message" className="text-xs">Message</TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Campaign Name *</Label>
              <Input value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Welcome WhatsApp" className="h-9 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Template Name</Label>
                <Input value={formData.templateName} onChange={(e) => setFormData((p) => ({ ...p, templateName: e.target.value }))} placeholder="e.g. welcome_message" className="h-9 mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Language</Label>
                <Input value={formData.templateLanguage} onChange={(e) => setFormData((p) => ({ ...p, templateLanguage: e.target.value }))} placeholder="en" className="h-9 mt-1" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="message" className="mt-4">
            <WhatsappComposer
              bodyText={formData.bodyText}
              headerText={formData.headerText}
              footerText={formData.footerText}
              mediaUrl={formData.mediaUrl}
              onBodyChange={(t) => setFormData((p) => ({ ...p, bodyText: t }))}
              onHeaderChange={(t) => setFormData((p) => ({ ...p, headerText: t }))}
              onFooterChange={(t) => setFormData((p) => ({ ...p, footerText: t }))}
              onMediaChange={(u) => setFormData((p) => ({ ...p, mediaUrl: u }))}
            />
          </TabsContent>

          <TabsContent value="schedule" className="mt-4">
            <SchedulePicker
              value={{ date: formData.scheduledAt ? new Date(formData.scheduledAt) : undefined, time: '09:00', timezone: formData.timezone }}
              onChange={(c) => setFormData((p) => ({ ...p, scheduledAt: c.date?.toISOString() ?? '', timezone: c.timezone }))}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave} disabled={!formData.name || createCampaign.isPending || updateCampaign.isPending}>
            {createCampaign.isPending || updateCampaign.isPending ? 'Saving...' : isEditing ? 'Update' : 'Create Campaign'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
