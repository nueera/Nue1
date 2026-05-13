'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Zap, Plus, ArrowRight, Play, Save, Trash2, GripVertical,
  Mail, MessageSquare, Tag, UserPlus, Globe, Webhook,
} from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import type { Workflow, WorkflowTrigger, WorkflowAction } from '@/modules/marketing/types';

const TRIGGER_ICONS: Record<string, typeof Zap> = { form_submitted: Zap, link_clicked: Globe, tag_added: Tag };
const ACTION_ICONS: Record<string, typeof Mail> = {
  send_email: Mail, send_sms: MessageSquare, add_tag: Tag,
  add_to_list: UserPlus, webhook: Webhook,
};

interface WorkflowBuilderProps {
  workflow?: Workflow;
  onSave?: (workflow: Partial<Workflow>) => void;
}

export function WorkflowBuilder({ workflow, onSave }: WorkflowBuilderProps) {
  const [trigger, setTrigger] = useState<WorkflowTrigger>(workflow?.trigger ?? 'form_submitted');
  const [conditions, setConditions] = useState<string[]>(workflow?.conditions ?? []);
  const [actions, setActions] = useState<Array<{ type: WorkflowAction; config: Record<string, unknown> }>>(
    workflow?.actions?.map((a) => ({ type: a.type, config: a.config })) ?? []
  );
  const [showTriggerForm, setShowTriggerForm] = useState(false);
  const [showConditionForm, setShowConditionForm] = useState(false);
  const [showActionForm, setShowActionForm] = useState(false);

  const addAction = (type: WorkflowAction) => {
    setActions([...actions, { type, config: {} }]);
    setShowActionForm(false);
  };

  const removeAction = (idx: number) => {
    setActions(actions.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              Workflow Builder
            </CardTitle>
            <Button size="sm" onClick={() => onSave?.({ trigger, conditions, actions: actions.map((a, i) => ({ ...a, order: i })) } as any)}>
              <Save className="h-4 w-4 mr-2" />Save
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Trigger */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                <Zap className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-sm font-semibold">Trigger</span>
            </div>
            <div className="ml-10 p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">When {trigger.replace(/_/g, ' ')}</Badge>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setShowTriggerForm(!showTriggerForm)}>Edit</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-4"><ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" /></div>

          {/* Conditions */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                <Tag className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-semibold">Conditions</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs ml-auto" onClick={() => setShowConditionForm(!showConditionForm)}>
                <Plus className="h-3 w-3 mr-1" />Add
              </Button>
            </div>
            <div className="ml-10 space-y-2">
              {conditions.length === 0 ? (
                <p className="text-xs text-muted-foreground p-2">No conditions. All contacts will pass through.</p>
              ) : (
                conditions.map((cond, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
                    <Badge variant="secondary" className="text-xs">{cond.replace(/_/g, ' ')}</Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={() => setConditions(conditions.filter((_, i) => i !== idx))}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-center mb-4"><ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" /></div>

          {/* Actions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
                <Play className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="text-sm font-semibold">Actions</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs ml-auto" onClick={() => setShowActionForm(!showActionForm)}>
                <Plus className="h-3 w-3 mr-1" />Add
              </Button>
            </div>
            <div className="ml-10 space-y-2">
              {actions.map((action, idx) => {
                const ActionIcon = ACTION_ICONS[action.type] ?? Play;
                return (
                  <motion.div key={idx} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <ActionIcon className="h-4 w-4 text-emerald-600" />
                    <Badge variant="secondary" className="text-xs">{action.type.replace(/_/g, ' ')}</Badge>
                    <span className="text-xs text-muted-foreground">Step {idx + 1}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={() => removeAction(idx)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </motion.div>
                );
              })}
              {actions.length === 0 && (
                <p className="text-xs text-muted-foreground p-2">No actions added yet.</p>
              )}
              {showActionForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-2 p-2 rounded-lg bg-muted/30">
                  {(['send_email', 'send_sms', 'add_tag', 'add_to_list', 'webhook'] as WorkflowAction[]).map((type) => {
                    const Icon = ACTION_ICONS[type] ?? Play;
                    return (
                      <Button key={type} variant="outline" size="sm" className="text-xs gap-1" onClick={() => addAction(type)}>
                        <Icon className="h-3 w-3" />{type.replace(/_/g, ' ')}
                      </Button>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
