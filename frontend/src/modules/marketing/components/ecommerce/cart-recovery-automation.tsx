'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Zap, Plus, Trash2, Clock, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecoveryStep {
  id: string;
  type: 'email' | 'sms' | 'push';
  delayHours: number;
  subject?: string;
  message: string;
  discount?: number;
  enabled: boolean;
}

interface CartRecoveryAutomationProps {
  onSave?: (steps: RecoveryStep[]) => void;
}

const DEFAULT_STEPS: RecoveryStep[] = [
  { id: '1', type: 'email', delayHours: 1, subject: 'Did you forget something?', message: 'Your cart is waiting for you!', discount: 0, enabled: true },
  { id: '2', type: 'email', delayHours: 24, subject: 'Still thinking about it?', message: 'Here\'s a special offer just for you.', discount: 10, enabled: true },
  { id: '3', type: 'sms', delayHours: 72, message: 'Last chance! Your cart will expire soon.', discount: 15, enabled: false },
];

export function CartRecoveryAutomation({ onSave }: CartRecoveryAutomationProps) {
  const [steps, setSteps] = useState<RecoveryStep[]>(DEFAULT_STEPS);
  const [active, setActive] = useState(true);

  const addStep = () => {
    setSteps([...steps, {
      id: Date.now().toString(),
      type: 'email',
      delayHours: 48,
      message: '',
      discount: 0,
      enabled: true,
    }]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const updateStep = (id: string, updates: Partial<RecoveryStep>) => {
    setSteps(steps.map((s) => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <div className="space-y-4">
      {/* Automation toggle */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium">Cart Recovery Automation</p>
                <p className="text-xs text-muted-foreground">Automatically send recovery messages to abandoned carts</p>
              </div>
            </div>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Step {idx + 1}</Badge>
                    {step.type === 'email' ? (
                      <Mail className="h-4 w-4 text-blue-500" />
                    ) : step.type === 'sms' ? (
                      <MessageSquare className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Zap className="h-4 w-4 text-purple-500" />
                    )}
                    <Select value={step.type} onValueChange={(v) => updateStep(step.id, { type: v as RecoveryStep['type'] })}>
                      <SelectTrigger className="w-24 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Push</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={step.enabled} onCheckedChange={(v) => updateStep(step.id, { enabled: v })} />
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeStep(step.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Delay (hours)</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <Input type="number" value={step.delayHours} onChange={(e) => updateStep(step.id, { delayHours: Number(e.target.value) })} className="h-8 text-sm" min={0} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Discount %</Label>
                    <Input type="number" value={step.discount ?? 0} onChange={(e) => updateStep(step.id, { discount: Number(e.target.value) })} className="h-8 text-sm" min={0} max={100} />
                  </div>
                </div>

                {step.type === 'email' && (
                  <div className="space-y-1">
                    <Label className="text-xs">Subject</Label>
                    <Input value={step.subject ?? ''} onChange={(e) => updateStep(step.id, { subject: e.target.value })} placeholder="Email subject line" className="h-8 text-sm" />
                  </div>
                )}

                <div className="space-y-1">
                  <Label className="text-xs">Message</Label>
                  <Textarea value={step.message} onChange={(e) => updateStep(step.id, { message: e.target.value })} placeholder="Recovery message..." rows={2} className="text-sm" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" onClick={addStep} className="w-full">
        <Plus className="h-4 w-4 mr-2" />Add Step
      </Button>

      <Button onClick={() => onSave?.(steps)} className="w-full">
        Save Automation
      </Button>
    </div>
  );
}
