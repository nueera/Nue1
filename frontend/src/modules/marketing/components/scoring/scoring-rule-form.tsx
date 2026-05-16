'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ScoringRule, ScoringCriteria } from '@/modules/marketing/types';
import { ScoringCriteriaBuilder } from './scoring-criteria-builder';
import { Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoringRuleFormProps {
  rule?: ScoringRule;
  onSave?: (data: Partial<ScoringRule>) => void;
  onCancel?: () => void;
}

export function ScoringRuleForm({ rule, onSave, onCancel }: ScoringRuleFormProps) {
  const [name, setName] = useState(rule?.name ?? '');
  const [criteria, setCriteria] = useState<ScoringCriteria>(rule?.criteria ?? 'email_engagement');
  const [condition, setCondition] = useState(rule?.condition ?? '');
  const [points, setPoints] = useState(rule?.points ?? 5);
  const [isPositive, setIsPositive] = useState(rule?.isPositive ?? true);
  const [isActive, setIsActive] = useState(rule?.isActive ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({ name, criteria, condition, points, isPositive, isActive });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="border-border/50 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">{rule ? 'Edit Scoring Rule' : 'Create Scoring Rule'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Rule Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Opens Emails" className="h-9" required />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Criteria Category</Label>
              <Select value={criteria} onValueChange={(v) => setCriteria(v as ScoringCriteria)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="email_engagement">Email Engagement</SelectItem>
                  <SelectItem value="web_activity">Web Activity</SelectItem>
                  <SelectItem value="social_engagement">Social Engagement</SelectItem>
                  <SelectItem value="demographic_fit">Demographic Fit</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Condition Description</Label>
              <Textarea value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="e.g., Contact opens more than 50% of emails" className="min-h-[60px]" rows={2} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Points</Label>
                <Input type="number" value={points} onChange={(e) => setPoints(parseInt(e.target.value) || 0)} className="h-9" min={0} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Direction</Label>
                <Select value={isPositive ? 'positive' : 'negative'} onValueChange={(v) => setIsPositive(v === 'positive')}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive (+)</SelectItem>
                    <SelectItem value="negative">Negative (-)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs">Active</Label>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {onCancel && (
                <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                  <X className="h-4 w-4 mr-1" />Cancel
                </Button>
              )}
              <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="h-4 w-4 mr-1" />{rule ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
