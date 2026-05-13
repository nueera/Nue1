'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SegmentCondition as SegmentConditionType, ConditionOperator } from '@/modules/marketing/types';
import { X, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface SegmentConditionProps {
  condition: SegmentConditionType;
  onUpdate: (condition: SegmentConditionType) => void;
  onRemove: () => void;
  showLogicalOperator?: boolean;
}

const fieldOptions = [
  'email', 'firstName', 'lastName', 'phone', 'company', 'jobTitle',
  'source', 'stage', 'status', 'score', 'tags', 'lastContactedAt',
  'createdAt', 'unsubscribeCount', 'bounceCount',
];

const operatorOptions: Array<{ value: ConditionOperator; label: string }> = [
  { value: 'equals', label: 'equals' },
  { value: 'not_equals', label: 'not equals' },
  { value: 'contains', label: 'contains' },
  { value: 'not_contains', label: 'does not contain' },
  { value: 'starts_with', label: 'starts with' },
  { value: 'ends_with', label: 'ends with' },
  { value: 'greater_than', label: 'greater than' },
  { value: 'less_than', label: 'less than' },
  { value: 'between', label: 'between' },
  { value: 'in', label: 'in' },
  { value: 'not_in', label: 'not in' },
  { value: 'is_set', label: 'is set' },
  { value: 'is_not_set', label: 'is not set' },
  { value: 'before', label: 'before' },
  { value: 'after', label: 'after' },
  { value: 'within_last', label: 'within last' },
  { value: 'within_next', label: 'within next' },
];

const noValueOperators = ['is_set', 'is_not_set'];

export function SegmentCondition({ condition, onUpdate, onRemove, showLogicalOperator }: SegmentConditionProps) {
  const needsValue = !noValueOperators.includes(condition.operator);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      className="flex items-center gap-2 group"
    >
      <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />

      {showLogicalOperator && (
        <Select
          value={condition.logicalOperator}
          onValueChange={(v) => onUpdate({ ...condition, logicalOperator: v as 'and' | 'or' })}
        >
          <SelectTrigger className="w-16 h-7 text-[10px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="and">AND</SelectItem>
            <SelectItem value="or">OR</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* Field */}
      <Select value={condition.field} onValueChange={(v) => onUpdate({ ...condition, field: v })}>
        <SelectTrigger className="w-32 h-7 text-xs">
          <SelectValue placeholder="Field" />
        </SelectTrigger>
        <SelectContent>
          {fieldOptions.map((f) => (
            <SelectItem key={f} value={f} className="text-xs">{f}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Operator */}
      <Select value={condition.operator} onValueChange={(v) => onUpdate({ ...condition, operator: v as ConditionOperator })}>
        <SelectTrigger className="w-32 h-7 text-xs">
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          {operatorOptions.map((op) => (
            <SelectItem key={op.value} value={op.value} className="text-xs">{op.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Value */}
      {needsValue && (
        <Input
          value={String(condition.value)}
          onChange={(e) => onUpdate({ ...condition, value: e.target.value })}
          placeholder="Value..."
          className="h-7 text-xs flex-1 min-w-[100px]"
        />
      )}

      {/* Remove */}
      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive" onClick={onRemove}>
        <X className="h-3 w-3" />
      </Button>
    </motion.div>
  );
}
