'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SmsComposer } from './sms-composer';
import { SmsRecipientPicker } from './sms-recipient-picker';
import { SchedulePicker, type ScheduleConfig } from '../shared/schedule-picker';
import { useCreateCampaign, useUpdateCampaign } from '@/modules/marketing/hooks';
import type { Campaign } from '@/modules/marketing/types';
import { X } from 'lucide-react';

interface SmsCampaignFormProps {
  campaign?: Campaign;
  onSubmit?: (data: Record<string, unknown>) => void;
  onCancel: () => void;
  className?: string;
}

export function SmsCampaignForm({ campaign, onSubmit, onCancel, className }: SmsCampaignFormProps) {
  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();
  const [activeTab, setActiveTab] = useState('details');

  const [formData, setFormData] = useState({
    name: campaign?.name ?? '',
    message: '',
    senderId: '',
    shortLink: '',
    optOutMessage: 'Reply STOP to unsubscribe',
    audienceIds: [] as string[],
    segmentIds: [] as string[],
    scheduledAt: '',
    timezone: 'America/New_York',
  });

  const isEditing = !!campaign;

  const handleSave = async () => {
    try {
      if (isEditing && campaign) {
        await updateCampaign.mutateAsync({ id: campaign.id, data: formData });
      } else {
        await createCampaign.mutateAsync({ ...formData, type: 'sms', channel: 'sms' });
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
            {isEditing ? 'Edit SMS Campaign' : 'New SMS Campaign'}
          </CardTitle>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
            <TabsTrigger value="message" className="text-xs">Message</TabsTrigger>
            <TabsTrigger value="recipients" className="text-xs">Recipients</TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Campaign Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Flash Sale Alert"
                className="h-9 mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Sender ID</Label>
              <Input
                value={formData.senderId}
                onChange={(e) => setFormData((p) => ({ ...p, senderId: e.target.value }))}
                placeholder="e.g. ACME"
                className="h-9 mt-1"
                maxLength={11}
              />
              <p className="text-[10px] text-muted-foreground mt-1">Max 11 alphanumeric characters</p>
            </div>
          </TabsContent>

          <TabsContent value="message" className="mt-4">
            <SmsComposer
              value={formData.message}
              onChange={(msg) => setFormData((p) => ({ ...p, message: msg }))}
              optOutMessage={formData.optOutMessage}
              onOptOutChange={(msg) => setFormData((p) => ({ ...p, optOutMessage: msg }))}
            />
          </TabsContent>

          <TabsContent value="recipients" className="mt-4">
            <SmsRecipientPicker
              selectedAudienceIds={formData.audienceIds}
              selectedSegmentIds={formData.segmentIds}
              onAudienceChange={(ids) => setFormData((p) => ({ ...p, audienceIds: ids }))}
              onSegmentChange={(ids) => setFormData((p) => ({ ...p, segmentIds: ids }))}
            />
          </TabsContent>

          <TabsContent value="schedule" className="mt-4">
            <SchedulePicker
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
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSave}
            disabled={!formData.name || createCampaign.isPending || updateCampaign.isPending}
          >
            {createCampaign.isPending || updateCampaign.isPending
              ? 'Saving...'
              : isEditing ? 'Update' : 'Create SMS Campaign'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
