// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SegmentCondition } from './segment-condition';
import type { SegmentRule, SegmentCondition as SegmentConditionType } from '@/modules/marketing/types';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SegmentRuleGroupProps {
  rule: SegmentRule;
  onUpdate: (rule: SegmentRule) => void;
  onRemove: () => void;
  canRemove?: boolean;
}

export function SegmentRuleGroup({ rule, onUpdate, onRemove, canRemove = true }: SegmentRuleGroupProps) {
  const handleAddCondition = () => {
    const newCondition: SegmentConditionType = {
      id: `cond-${Date.now()}`,
      field: 'email',
      operator: 'contains',
      value: '',
      logicalOperator: 'and',
    };
    onUpdate({
      ...rule,
      conditions: [...rule.conditions, newCondition],
    });
  };

  const handleUpdateCondition = (conditionId: string, updatedCondition: SegmentConditionType) => {
    onUpdate({
      ...rule,
      conditions: rule.conditions.map((c) => (c.id === conditionId ? updatedCondition : c)),
    });
  };

  const handleRemoveCondition = (conditionId: string) => {
    if (rule.conditions.length <= 1) return;
    onUpdate({
      ...rule,
      conditions: rule.conditions.filter((c) => c.id !== conditionId),
    });
  };

  return (
    <Card className="border-border/50 border-l-4 border-l-violet-400">
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-muted-foreground/40" />
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              {rule.name}
            </CardTitle>
            <Badge variant="outline" className="text-[10px]">AND group</Badge>
          </div>
          {canRemove && (
            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={onRemove}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-3 space-y-2">
        <AnimatePresence>
          {rule.conditions.map((condition, index) => (
            <SegmentCondition
              key={condition.id}
              condition={condition}
              onUpdate={(updated) => handleUpdateCondition(condition.id, updated)}
              onRemove={() => handleRemoveCondition(condition.id)}
              showLogicalOperator={index > 0}
            />
          ))}
        </AnimatePresence>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-violet-600 hover:text-violet-700" onClick={handleAddCondition}>
          <Plus className="h-3 w-3 mr-1" />Add Condition
        </Button>
      </CardContent>
    </Card>
  );
}
