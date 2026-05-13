'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ScoringCriteria } from '@/modules/marketing/types';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CriteriaCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface ScoringCriteriaBuilderProps {
  criteria: ScoringCriteria;
  conditions?: CriteriaCondition[];
  onConditionsChange?: (conditions: CriteriaCondition[]) => void;
}

const criteriaFields: Record<ScoringCriteria, string[]> = {
  email_engagement: ['email_open_rate', 'email_click_rate', 'email_reply_count', 'unsubscribe_count'],
  web_activity: ['page_visits', 'session_duration', 'form_submissions', 'download_count'],
  social_engagement: ['social_shares', 'social_comments', 'social_likes', 'social_follows'],
  demographic_fit: ['job_title', 'company_size', 'industry', 'location'],
  behavioral: ['purchase_count', 'cart_abandon_count', 'support_tickets', 'feature_usage'],
  custom: ['custom_field_1', 'custom_field_2', 'custom_field_3'],
};

const operators = ['equals', 'not_equals', 'greater_than', 'less_than', 'contains', 'between'];

export function ScoringCriteriaBuilder({ criteria, conditions: externalConditions, onConditionsChange }: ScoringCriteriaBuilderProps) {
  const [conditions, setConditions] = useState<CriteriaCondition[]>(
    externalConditions ?? [{ id: 'c-1', field: criteriaFields[criteria]?.[0] ?? 'field', operator: 'greater_than', value: '' }]
  );

  const handleAdd = () => {
    const newCond: CriteriaCondition = {
      id: `c-${Date.now()}`,
      field: criteriaFields[criteria]?.[0] ?? 'field',
      operator: 'greater_than',
      value: '',
    };
    const updated = [...conditions, newCond];
    setConditions(updated);
    onConditionsChange?.(updated);
  };

  const handleRemove = (id: string) => {
    if (conditions.length <= 1) return;
    const updated = conditions.filter((c) => c.id !== id);
    setConditions(updated);
    onConditionsChange?.(updated);
  };

  const handleUpdate = (id: string, partial: Partial<CriteriaCondition>) => {
    const updated = conditions.map((c) => (c.id === id ? { ...c, ...partial } : c));
    setConditions(updated);
    onConditionsChange?.(updated);
  };

  const fields = criteriaFields[criteria] ?? ['field'];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm">Criteria Conditions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {conditions.map((cond) => (
          <motion.div
            key={cond.id}
            layout
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Select value={cond.field} onValueChange={(v) => handleUpdate(cond.id, { field: v })}>
              <SelectTrigger className="h-7 text-xs w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                {fields.map((f) => (
                  <SelectItem key={f} value={f} className="text-xs">{f.replace(/_/g, ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={cond.operator} onValueChange={(v) => handleUpdate(cond.id, { operator: v })}>
              <SelectTrigger className="h-7 text-xs w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                {operators.map((op) => (
                  <SelectItem key={op} value={op} className="text-xs">{op.replace(/_/g, ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={cond.value}
              onChange={(e) => handleUpdate(cond.id, { value: e.target.value })}
              className="h-7 text-xs flex-1"
              placeholder="Value"
            />
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-destructive" onClick={() => handleRemove(cond.id)} disabled={conditions.length <= 1}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </motion.div>
        ))}
        <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={handleAdd}>
          <Plus className="h-3 w-3 mr-1" />Add Condition
        </Button>
      </CardContent>
    </Card>
  );
}
