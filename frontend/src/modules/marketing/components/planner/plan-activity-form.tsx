'use client';

import { useState } from 'react';
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
import { X, Save, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PlanActivity } from '@/modules/marketing/types';

const ACTIVITY_TYPES: Array<{ value: PlanActivity; label: string }> = [
  { value: 'campaign', label: 'Campaign' },
  { value: 'content', label: 'Content' },
  { value: 'event', label: 'Event' },
  { value: 'social_post', label: 'Social Post' },
  { value: 'ad_spend', label: 'Ad Spend' },
  { value: 'review', label: 'Review' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'deadline', label: 'Deadline' },
];

interface PlanActivityFormProps {
  planId: string;
  onClose?: () => void;
  onSave?: (activity: { type: PlanActivity; name: string; date: string; notes: string; budget: number }) => void;
}

export function PlanActivityForm({ planId, onClose, onSave }: PlanActivityFormProps) {
  const [type, setType] = useState<PlanActivity>('campaign');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('0');

  const handleSubmit = () => {
    onSave?.({
      type,
      name,
      date,
      notes,
      budget: Number(budget),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Plus className="h-5 w-5 text-emerald-600" />
              Add Activity
            </CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Activity Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as PlanActivity)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACTIVITY_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-name">Activity Name</Label>
            <Input
              id="activity-name"
              placeholder="e.g., Launch email campaign"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activity-date">Date</Label>
              <Input
                id="activity-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-budget">Budget</Label>
              <Input
                id="activity-budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-notes">Notes</Label>
            <Textarea
              id="activity-notes"
              placeholder="Add any notes about this activity..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={handleSubmit} disabled={!name || !date}>
              <Save className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
