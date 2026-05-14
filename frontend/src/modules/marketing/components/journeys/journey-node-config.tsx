// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import type { JourneyNode, JourneyNodeType, JourneyTrigger } from '@/modules/marketing/types';
import { Trash2 } from 'lucide-react';

interface JourneyNodeConfigProps {
  node: JourneyNode;
  onUpdate: (config: Record<string, unknown>) => void;
  onRemove: () => void;
}

export function JourneyNodeConfig({ node, onUpdate, onRemove }: JourneyNodeConfigProps) {
  const handleChange = (key: string, value: unknown) => {
    onUpdate({ [key]: value });
  };

  const renderConfig = () => {
    switch (node.type) {
      case 'trigger':
        return (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Trigger Type</Label>
              <Select value={(node.config.triggerType as string) ?? 'list_entry'} onValueChange={(v) => handleChange('triggerType', v)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="list_entry">List Join</SelectItem>
                  <SelectItem value="form_submit">Form Submit</SelectItem>
                  <SelectItem value="page_visit">Page Visit</SelectItem>
                  <SelectItem value="email_open">Email Open</SelectItem>
                  <SelectItem value="email_click">Email Click</SelectItem>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="custom_event">Custom Event</SelectItem>
                  <SelectItem value="date_based">Date Based</SelectItem>
                  <SelectItem value="score_threshold">Score Threshold</SelectItem>
                  <SelectItem value="api_call">API Call</SelectItem>
                  <SelectItem value="field_change">Field Change</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">List / Form ID</Label>
              <Input value={(node.config.listId as string) ?? ''} onChange={(e) => handleChange('listId', e.target.value)} className="h-8 text-sm" placeholder="Select target..." />
            </div>
          </>
        );
      case 'email':
        return (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Email Template</Label>
              <Select value={(node.config.templateId as string) ?? ''} onValueChange={(v) => handleChange('templateId', v)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select template" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome Email</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="promo">Promotional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Subject</Label>
              <Input value={(node.config.subject as string) ?? ''} onChange={(e) => handleChange('subject', e.target.value)} className="h-8 text-sm" placeholder="Email subject..." />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">From Name</Label>
              <Input value={(node.config.fromName as string) ?? ''} onChange={(e) => handleChange('fromName', e.target.value)} className="h-8 text-sm" />
            </div>
          </>
        );
      case 'sms':
        return (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Message</Label>
              <Textarea value={(node.config.message as string) ?? ''} onChange={(e) => handleChange('message', e.target.value)} className="text-sm min-h-[80px]" placeholder="SMS text..." rows={3} maxLength={160} />
              <p className="text-[10px] text-muted-foreground">{((node.config.message as string) ?? '').length}/160</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Sender ID</Label>
              <Input value={(node.config.senderId as string) ?? ''} onChange={(e) => handleChange('senderId', e.target.value)} className="h-8 text-sm" />
            </div>
          </>
        );
      case 'whatsapp':
        return (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Template Name</Label>
              <Input value={(node.config.templateName as string) ?? ''} onChange={(e) => handleChange('templateName', e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Language</Label>
              <Select value={(node.config.language as string) ?? 'en'} onValueChange={(v) => handleChange('language', v)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case 'delay':
        return (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Duration</Label>
              <div className="flex items-center gap-2">
                <Input type="number" value={(node.config.duration as number) ?? 1} onChange={(e) => handleChange('duration', parseInt(e.target.value) || 1)} className="h-8 text-sm w-20" min={1} />
                <Select value={(node.config.unit as string) ?? 'hours'} onValueChange={(v) => handleChange('unit', v)}>
                  <SelectTrigger className="h-8 text-xs w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Wait until specific time</Label>
              <Switch checked={(node.config.waitUntil as boolean) ?? false} onCheckedChange={(v) => handleChange('waitUntil', v)} />
            </div>
          </>
        );
      case 'condition':
        return (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Condition Field</Label>
              <Input value={(node.config.field as string) ?? ''} onChange={(e) => handleChange('field', e.target.value)} className="h-8 text-sm" placeholder="e.g., score" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Operator</Label>
              <Select value={(node.config.operator as string) ?? 'greater_than'} onValueChange={(v) => handleChange('operator', v)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="not_equals">Not Equals</SelectItem>
                  <SelectItem value="greater_than">Greater Than</SelectItem>
                  <SelectItem value="less_than">Less Than</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Value</Label>
              <Input value={(node.config.value as string) ?? ''} onChange={(e) => handleChange('value', e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Yes Path Label</Label>
              <Input value={(node.config.yesLabel as string) ?? 'Yes'} onChange={(e) => handleChange('yesLabel', e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">No Path Label</Label>
              <Input value={(node.config.noLabel as string) ?? 'No'} onChange={(e) => handleChange('noLabel', e.target.value)} className="h-8 text-sm" />
            </div>
          </>
        );
      case 'action':
        return (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs">Action Type</Label>
              <Select value={(node.config.actionType as string) ?? 'add_tag'} onValueChange={(v) => handleChange('actionType', v)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="add_tag">Add Tag</SelectItem>
                  <SelectItem value="remove_tag">Remove Tag</SelectItem>
                  <SelectItem value="update_field">Update Field</SelectItem>
                  <SelectItem value="add_to_list">Add to List</SelectItem>
                  <SelectItem value="remove_from_list">Remove from List</SelectItem>
                  <SelectItem value="score_adjust">Adjust Score</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Value</Label>
              <Input value={(node.config.value as string) ?? ''} onChange={(e) => handleChange('value', e.target.value)} className="h-8 text-sm" placeholder="Tag name, field value..." />
            </div>
          </>
        );
      case 'exit':
        return (
          <p className="text-xs text-muted-foreground">Exit node ends the journey for the contact.</p>
        );
      default:
        return <p className="text-xs text-muted-foreground">No configuration available.</p>;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-150 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {node.type.charAt(0).toUpperCase() + node.type.slice(1)} Node
        </h3>
        {node.type !== 'trigger' && node.type !== 'exit' && (
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onRemove}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="space-y-3">{renderConfig()}</div>
    </div>
  );
}
