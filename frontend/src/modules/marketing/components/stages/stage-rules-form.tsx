// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import type { LeadStageDefinition } from '@/modules/marketing/types';
import { Plus, Trash2, ArrowRight, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionRule {
  id: string;
  fromStage: string;
  toStage: string;
  condition: string;
  field: string;
  operator: string;
  value: string;
  isActive: boolean;
}

interface StageRulesFormProps {
  stages?: LeadStageDefinition[];
  rules?: TransitionRule[];
  onSave?: (rules: TransitionRule[]) => void;
}

const defaultStages = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'];

export function StageRulesForm({ stages: externalStages, rules: externalRules, onSave }: StageRulesFormProps) {
  const stageNames = externalStages?.map((s) => s.name) ?? defaultStages;
  const [rules, setRules] = useState<TransitionRule[]>(
    externalRules ?? [
      { id: 'r-1', fromStage: 'new', toStage: 'contacted', condition: 'First contact made', field: 'lastContactedAt', operator: 'is_set', value: '', isActive: true },
      { id: 'r-2', fromStage: 'contacted', toStage: 'qualified', condition: 'Score above 50', field: 'score', operator: 'greater_than', value: '50', isActive: true },
    ]
  );

  const handleAdd = () => {
    const newRule: TransitionRule = {
      id: `r-${Date.now()}`,
      fromStage: stageNames[0],
      toStage: stageNames[1],
      condition: '',
      field: '',
      operator: 'equals',
      value: '',
      isActive: true,
    };
    setRules([...rules, newRule]);
  };

  const handleUpdate = (id: string, partial: Partial<TransitionRule>) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, ...partial } : r)));
  };

  const handleRemove = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    onSave?.(rules);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Auto-Transition Rules</h3>
          <p className="text-sm text-muted-foreground mt-1">Define rules for automatic stage transitions</p>
        </div>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />Save
        </Button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <Card className="border-border/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Select value={rule.fromStage} onValueChange={(v) => handleUpdate(rule.id, { fromStage: v })}>
                        <SelectTrigger className="h-7 text-xs w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {stageNames.map((s) => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <Select value={rule.toStage} onValueChange={(v) => handleUpdate(rule.id, { toStage: v })}>
                        <SelectTrigger className="h-7 text-xs w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {stageNames.map((s) => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={rule.isActive} onCheckedChange={(v) => handleUpdate(rule.id, { isActive: v })} />
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleRemove(rule.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px]">Field</Label>
                      <Input value={rule.field} onChange={(e) => handleUpdate(rule.id, { field: e.target.value })} className="h-7 text-xs" placeholder="Field name" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Operator</Label>
                      <Select value={rule.operator} onValueChange={(v) => handleUpdate(rule.id, { operator: v })}>
                        <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals" className="text-xs">equals</SelectItem>
                          <SelectItem value="greater_than" className="text-xs">greater than</SelectItem>
                          <SelectItem value="less_than" className="text-xs">less than</SelectItem>
                          <SelectItem value="contains" className="text-xs">contains</SelectItem>
                          <SelectItem value="is_set" className="text-xs">is set</SelectItem>
                          <SelectItem value="is_not_set" className="text-xs">is not set</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Value</Label>
                      <Input value={rule.value} onChange={(e) => handleUpdate(rule.id, { value: e.target.value })} className="h-7 text-xs" placeholder="Value" disabled={rule.operator === 'is_set' || rule.operator === 'is_not_set'} />
                    </div>
                  </div>

                  {rule.condition && (
                    <p className="text-[10px] text-muted-foreground">Description: {rule.condition}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
        <Plus className="h-4 w-4 mr-1" />Add Rule
      </Button>
    </div>
  );
}
