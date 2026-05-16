'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Filter, X, Save, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WorkflowCondition } from '@/modules/marketing/types';

const CONDITIONS: Array<{ value: WorkflowCondition; label: string }> = [
  { value: 'has_tag', label: 'Has Tag' },
  { value: 'in_list', label: 'In List' },
  { value: 'field_value', label: 'Field Value' },
  { value: 'score_range', label: 'Score Range' },
  { value: 'activity_count', label: 'Activity Count' },
  { value: 'time_since', label: 'Time Since' },
  { value: 'device_type', label: 'Device Type' },
  { value: 'geo_location', label: 'Geo Location' },
  { value: 'utm_param', label: 'UTM Parameter' },
];

interface ConditionRow {
  type: WorkflowCondition;
  value: string;
  operator: string;
}

interface WorkflowConditionFormProps {
  conditions?: ConditionRow[];
  onSave?: (conditions: ConditionRow[]) => void;
  onCancel?: () => void;
}

export function WorkflowConditionForm({ conditions: initialConditions, onSave, onCancel }: WorkflowConditionFormProps) {
  const [conditions, setConditions] = useState<ConditionRow[]>(initialConditions ?? []);

  const addCondition = () => {
    setConditions([...conditions, { type: 'has_tag', value: '', operator: 'equals' }]);
  };

  const removeCondition = (idx: number) => {
    setConditions(conditions.filter((_, i) => i !== idx));
  };

  const updateCondition = (idx: number, updates: Partial<ConditionRow>) => {
    setConditions(conditions.map((c, i) => i === idx ? { ...c, ...updates } : c));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-600" />Conditions
            </CardTitle>
            {onCancel && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCancel}><X className="h-4 w-4" /></Button>}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {conditions.map((cond, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
              <Select value={cond.type} onValueChange={(v) => updateCondition(idx, { type: v as WorkflowCondition })}>
                <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={cond.operator} onValueChange={(v) => updateCondition(idx, { operator: v })}>
                <SelectTrigger className="w-28 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="not_equals">Not Equals</SelectItem>
                  <SelectItem value="greater_than">Greater Than</SelectItem>
                  <SelectItem value="less_than">Less Than</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Value" value={cond.value} onChange={(e) => updateCondition(idx, { value: e.target.value })} className="h-8 text-xs flex-1" />
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeCondition(idx)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addCondition} className="w-full">
            <Plus className="h-4 w-4 mr-2" />Add Condition
          </Button>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={() => onSave?.(conditions)} size="sm"><Save className="h-4 w-4 mr-2" />Save Conditions</Button>
            {onCancel && <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
