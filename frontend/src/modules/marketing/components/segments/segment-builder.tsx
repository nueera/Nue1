'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { SegmentRuleGroup } from './segment-rule-group';
import { SegmentPreview } from './segment-preview';
import type { Segment, SegmentRule, SegmentCondition } from '@/modules/marketing/types';
import { ArrowLeft, Save, Plus, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface SegmentBuilderProps {
  segment?: Segment;
  onSave?: (data: Partial<Segment>) => void;
  onBack?: () => void;
}

export function SegmentBuilder({ segment, onSave, onBack }: SegmentBuilderProps) {
  const [name, setName] = useState(segment?.name ?? '');
  const [description, setDescription] = useState(segment?.description ?? '');
  const [isDynamic, setIsDynamic] = useState(segment?.isDynamic ?? true);
  const [rules, setRules] = useState<SegmentRule[]>(
    segment?.rules ?? [
      {
        id: `rule-${Date.now()}`,
        name: 'Rule Group 1',
        conditions: [
          { id: `cond-${Date.now()}`, field: 'email', operator: 'contains', value: '@', logicalOperator: 'and' },
        ],
      },
    ]
  );

  const handleAddRule = () => {
    setRules([
      ...rules,
      {
        id: `rule-${Date.now()}`,
        name: `Rule Group ${rules.length + 1}`,
        conditions: [
          { id: `cond-${Date.now()}`, field: 'email', operator: 'contains', value: '', logicalOperator: 'and' },
        ],
      },
    ]);
  };

  const handleUpdateRule = (ruleId: string, updatedRule: SegmentRule) => {
    setRules(rules.map((r) => (r.id === ruleId ? updatedRule : r)));
  };

  const handleRemoveRule = (ruleId: string) => {
    if (rules.length <= 1) return;
    setRules(rules.filter((r) => r.id !== ruleId));
  };

  const handleSave = () => {
    onSave?.({ name, description, isDynamic, rules });
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {segment ? 'Edit Segment' : 'Create Segment'}
            </h2>
            <p className="text-sm text-muted-foreground">Define rules to filter your audience</p>
          </div>
        </div>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />Save
        </Button>
      </motion.div>

      {/* Basic Info */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.05 }}>
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Segment Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Engaged Subscribers" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe this segment..." className="min-h-[60px]" rows={2} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs">Dynamic Segment</Label>
                <p className="text-[10px] text-muted-foreground">Auto-updates when contact data changes</p>
              </div>
              <Switch checked={isDynamic} onCheckedChange={setIsDynamic} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rule Groups */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Rules</h3>
          <p className="text-xs text-muted-foreground">Groups are combined with OR logic</p>
        </div>

        {rules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
          >
            <SegmentRuleGroup
              rule={rule}
              onUpdate={(updatedRule) => handleUpdateRule(rule.id, updatedRule)}
              onRemove={() => handleRemoveRule(rule.id)}
              canRemove={rules.length > 1}
            />
          </motion.div>
        ))}

        <Button variant="outline" size="sm" className="w-full" onClick={handleAddRule}>
          <Plus className="h-4 w-4 mr-1" />Add OR Group
        </Button>
      </div>

      {/* Preview */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.2 }}>
        <SegmentPreview rules={rules} />
      </motion.div>
    </div>
  );
}
