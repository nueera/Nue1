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
import { Target, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TrackingGoal } from '@/modules/marketing/types';

interface GoalFormProps {
  goal?: TrackingGoal;
  onSave?: (data: Partial<TrackingGoal>) => void;
  onCancel?: () => void;
}

export function GoalForm({ goal, onSave, onCancel }: GoalFormProps) {
  const isEditing = !!goal;
  const [name, setName] = useState(goal?.name ?? '');
  const [type, setType] = useState<string>(goal?.type ?? 'page_visit');
  const [targetUrl, setTargetUrl] = useState(goal?.targetUrl ?? '');
  const [value, setValue] = useState(goal?.value?.toString() ?? '0');

  const handleSubmit = () => {
    onSave?.({
      name,
      type: type as TrackingGoal['type'],
      targetUrl: targetUrl || undefined,
      value: Number(value),
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50 max-w-lg mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />{isEditing ? 'Edit Goal' : 'Create Goal'}
            </CardTitle>
            {onCancel && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}><X className="h-4 w-4" /></Button>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Goal Name</Label>
            <Input placeholder="e.g., Purchase Complete" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Goal Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="page_visit">Page Visit</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="form_submit">Form Submit</SelectItem>
                <SelectItem value="custom_event">Custom Event</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(type === 'page_visit' || type === 'form_submit') && (
            <div className="space-y-2">
              <Label>Target URL</Label>
              <Input placeholder="/thank-you" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} />
            </div>
          )}
          <div className="space-y-2">
            <Label>Goal Value ($)</Label>
            <Input type="number" placeholder="0" value={value} onChange={(e) => setValue(e.target.value)} min={0} />
          </div>
          <Button onClick={handleSubmit} disabled={!name} className="w-full">
            <Save className="h-4 w-4 mr-2" />{isEditing ? 'Update' : 'Create'} Goal
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
