// @ts-nocheck
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
import { Play, X, Save, Mail, MessageSquare, Tag, UserPlus, Globe, Webhook, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WorkflowAction } from '@/modules/marketing/types';

const ACTIONS: Array<{ value: WorkflowAction; label: string; icon: typeof Mail }> = [
  { value: 'send_email', label: 'Send Email', icon: Mail },
  { value: 'send_sms', label: 'Send SMS', icon: MessageSquare },
  { value: 'send_whatsapp', label: 'Send WhatsApp', icon: MessageSquare },
  { value: 'add_tag', label: 'Add Tag', icon: Tag },
  { value: 'remove_tag', label: 'Remove Tag', icon: Tag },
  { value: 'add_to_list', label: 'Add to List', icon: UserPlus },
  { value: 'remove_from_list', label: 'Remove from List', icon: UserPlus },
  { value: 'update_field', label: 'Update Field', icon: Globe },
  { value: 'webhook', label: 'Webhook', icon: Webhook },
  { value: 'wait', label: 'Wait', icon: Clock },
  { value: 'score_adjust', label: 'Adjust Score', icon: Tag },
  { value: 'notify_user', label: 'Notify User', icon: Mail },
  { value: 'create_task', label: 'Create Task', icon: Globe },
];

interface WorkflowActionFormProps {
  actionType?: WorkflowAction;
  config?: Record<string, unknown>;
  onSave?: (type: WorkflowAction, config: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export function WorkflowActionForm({ actionType: initialType, config: initialConfig, onSave, onCancel }: WorkflowActionFormProps) {
  const [type, setType] = useState<WorkflowAction>(initialType ?? 'send_email');
  const [templateId, setTemplateId] = useState((initialConfig?.templateId as string) ?? '');
  const [tagName, setTagName] = useState((initialConfig?.tagName as string) ?? '');
  const [listId, setListId] = useState((initialConfig?.listId as string) ?? '');
  const [waitHours, setWaitHours] = useState((initialConfig?.waitHours as string) ?? '1');
  const [webhookUrl, setWebhookUrl] = useState((initialConfig?.url as string) ?? '');
  const [message, setMessage] = useState((initialConfig?.message as string) ?? '');

  const handleSave = () => {
    const config: Record<string, unknown> = {};
    if (type === 'send_email' || type === 'send_sms' || type === 'send_whatsapp') config.templateId = templateId;
    if (type === 'add_tag' || type === 'remove_tag') config.tagName = tagName;
    if (type === 'add_to_list' || type === 'remove_from_list') config.listId = listId;
    if (type === 'wait') config.waitHours = Number(waitHours);
    if (type === 'webhook') config.url = webhookUrl;
    if (type === 'send_sms' || type === 'send_whatsapp') config.message = message;
    onSave?.(type, config);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Play className="h-4 w-4 text-emerald-600" />Action Configuration
            </CardTitle>
            {onCancel && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCancel}><X className="h-4 w-4" /></Button>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Action Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as WorkflowAction)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {ACTIONS.map((a) => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {(type === 'send_email' || type === 'send_sms' || type === 'send_whatsapp') && (
            <div className="space-y-2">
              <Label>Template ID</Label>
              <Input placeholder="Select template..." value={templateId} onChange={(e) => setTemplateId(e.target.value)} />
            </div>
          )}

          {(type === 'send_sms' || type === 'send_whatsapp') && (
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Message content..." value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
            </div>
          )}

          {(type === 'add_tag' || type === 'remove_tag') && (
            <div className="space-y-2">
              <Label>Tag Name</Label>
              <Input placeholder="Enter tag name" value={tagName} onChange={(e) => setTagName(e.target.value)} />
            </div>
          )}

          {(type === 'add_to_list' || type === 'remove_from_list') && (
            <div className="space-y-2">
              <Label>List ID</Label>
              <Input placeholder="Select list..." value={listId} onChange={(e) => setListId(e.target.value)} />
            </div>
          )}

          {type === 'wait' && (
            <div className="space-y-2">
              <Label>Wait Duration (hours)</Label>
              <Input type="number" value={waitHours} onChange={(e) => setWaitHours(e.target.value)} min={1} />
            </div>
          )}

          {type === 'webhook' && (
            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <Input placeholder="https://api.example.com/webhook" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
            </div>
          )}

          <Button onClick={handleSave} size="sm"><Save className="h-4 w-4 mr-2" />Save Action</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
