// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Zap, X, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WorkflowTrigger } from '@/modules/marketing/types';

const TRIGGERS: Array<{ value: WorkflowTrigger; label: string }> = [
  { value: 'form_submitted', label: 'Form Submitted' },
  { value: 'link_clicked', label: 'Link Clicked' },
  { value: 'page_visited', label: 'Page Visited' },
  { value: 'list_joined', label: 'List Joined' },
  { value: 'tag_added', label: 'Tag Added' },
  { value: 'field_changed', label: 'Field Changed' },
  { value: 'score_threshold', label: 'Score Threshold' },
  { value: 'date_reached', label: 'Date Reached' },
  { value: 'api_call', label: 'API Call' },
  { value: 'manual', label: 'Manual' },
];

interface WorkflowTriggerFormProps {
  trigger?: WorkflowTrigger;
  config?: Record<string, unknown>;
  onSave?: (trigger: WorkflowTrigger, config: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export function WorkflowTriggerForm({ trigger: initialTrigger, config: initialConfig, onSave, onCancel }: WorkflowTriggerFormProps) {
  const [trigger, setTrigger] = useState<WorkflowTrigger>(initialTrigger ?? 'form_submitted');
  const [formId, setFormId] = useState((initialConfig?.formId as string) ?? '');
  const [url, setUrl] = useState((initialConfig?.url as string) ?? '');
  const [tagName, setTagName] = useState((initialConfig?.tagName as string) ?? '');
  const [scoreValue, setScoreValue] = useState((initialConfig?.scoreValue as string) ?? '');

  const handleSave = () => {
    const config: Record<string, unknown> = {};
    if (trigger === 'form_submitted') config.formId = formId;
    if (trigger === 'page_visited') config.url = url;
    if (trigger === 'tag_added') config.tagName = tagName;
    if (trigger === 'score_threshold') config.scoreValue = Number(scoreValue);
    onSave?.(trigger, config);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600" />Trigger Configuration
            </CardTitle>
            {onCancel && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCancel}><X className="h-4 w-4" /></Button>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Trigger Type</Label>
            <Select value={trigger} onValueChange={(v) => setTrigger(v as WorkflowTrigger)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TRIGGERS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {trigger === 'form_submitted' && (
            <div className="space-y-2">
              <Label>Form ID</Label>
              <Input placeholder="Select form..." value={formId} onChange={(e) => setFormId(e.target.value)} />
            </div>
          )}

          {trigger === 'page_visited' && (
            <div className="space-y-2">
              <Label>Page URL</Label>
              <Input placeholder="https://example.com/page" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
          )}

          {trigger === 'tag_added' && (
            <div className="space-y-2">
              <Label>Tag Name</Label>
              <Input placeholder="Enter tag name" value={tagName} onChange={(e) => setTagName(e.target.value)} />
            </div>
          )}

          {trigger === 'score_threshold' && (
            <div className="space-y-2">
              <Label>Score Value</Label>
              <Input type="number" placeholder="0" value={scoreValue} onChange={(e) => setScoreValue(e.target.value)} />
            </div>
          )}

          <Button onClick={handleSave} size="sm"><Save className="h-4 w-4 mr-2" />Save Trigger</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
