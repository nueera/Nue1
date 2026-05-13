'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Save, X, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PurchaseFollowup } from '@/modules/marketing/types';

const TRIGGER_OPTIONS = [
  { value: 'purchase', label: 'After Purchase' },
  { value: 'delivery', label: 'After Delivery' },
  { value: 'review_request', label: 'Review Request' },
  { value: 'cross_sell', label: 'Cross-Sell' },
  { value: 'upsell', label: 'Upsell' },
];

interface PurchaseFollowupFormProps {
  followup?: PurchaseFollowup;
  onSave?: (data: Partial<PurchaseFollowup>) => void;
  onCancel?: () => void;
}

export function PurchaseFollowupForm({ followup, onSave, onCancel }: PurchaseFollowupFormProps) {
  const isEditing = !!followup;
  const [name, setName] = useState(followup?.name ?? '');
  const [triggerEvent, setTriggerEvent] = useState(followup?.triggerEvent ?? 'purchase');
  const [templateId, setTemplateId] = useState(followup?.templateId ?? '');
  const [delayDays, setDelayDays] = useState(followup?.delayDays?.toString() ?? '3');
  const [active, setActive] = useState(followup?.status === 'active');
  const [messageContent, setMessageContent] = useState('');

  const handleSubmit = () => {
    onSave?.({
      name,
      triggerEvent: triggerEvent as PurchaseFollowup['triggerEvent'],
      templateId,
      delayDays: Number(delayDays),
      status: active ? 'active' : 'inactive',
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="border-border/50 max-w-lg mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5 text-emerald-600" />
              {isEditing ? 'Edit Follow-up' : 'Create Follow-up'}
            </CardTitle>
            {onCancel && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fup-name">Name</Label>
            <Input id="fup-name" placeholder="e.g., Post-purchase thank you" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Trigger Event</Label>
            <Select value={triggerEvent} onValueChange={setTriggerEvent}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TRIGGER_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fup-delay">Delay (days)</Label>
            <Input id="fup-delay" type="number" value={delayDays} onChange={(e) => setDelayDays(e.target.value)} min={0} className="h-9" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fup-template">Template ID</Label>
            <Input id="fup-template" placeholder="Select or enter template ID" value={templateId} onChange={(e) => setTemplateId(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fup-message">Message Preview</Label>
            <Textarea id="fup-message" placeholder="Write your follow-up message..." value={messageContent} onChange={(e) => setMessageContent(e.target.value)} rows={4} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <Label className="text-sm">Active</Label>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={handleSubmit} disabled={!name}>
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Update' : 'Create'}
            </Button>
            {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
