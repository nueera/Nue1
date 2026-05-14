// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import type { PopupTrigger } from '@/modules/marketing/types';
import { Clock, MousePointer, ArrowRightFromLine, Pointer, Monitor, Timer, Hand } from 'lucide-react';
import { motion } from 'framer-motion';

interface PopupTriggerConfigProps {
  trigger: PopupTrigger;
  config: Record<string, unknown>;
  onTriggerChange: (trigger: PopupTrigger) => void;
  onConfigChange: (config: Record<string, unknown>) => void;
}

const triggerOptions: Array<{
  value: PopupTrigger;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { value: 'time_on_page', label: 'Time on Page', icon: Clock, description: 'After X seconds' },
  { value: 'scroll_percentage', label: 'Scroll Percentage', icon: MousePointer, description: 'After scrolling X%' },
  { value: 'exit_intent', label: 'Exit Intent', icon: ArrowRightFromLine, description: 'When cursor leaves viewport' },
  { value: 'click_element', label: 'Click Element', icon: Pointer, description: 'When element is clicked' },
  { value: 'page_load', label: 'Page Load', icon: Monitor, description: 'Immediately on load' },
  { value: 'inactivity', label: 'Inactivity', icon: Timer, description: 'After X seconds idle' },
  { value: 'manual', label: 'Manual', icon: Hand, description: 'Triggered via API' },
];

export function PopupTriggerConfig({ trigger, config, onTriggerChange, onConfigChange }: PopupTriggerConfigProps) {
  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <h3 className="text-lg font-semibold text-foreground">Trigger Conditions</h3>
        <p className="text-sm text-muted-foreground mt-1">Choose when your popup should appear</p>
      </motion.div>

      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <Label className="text-xs font-semibold">Trigger Type</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {triggerOptions.map((opt) => (
              <motion.button
                key={opt.value}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                  trigger === opt.value
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'
                    : 'border-border hover:border-emerald-300'
                }`}
                onClick={() => onTriggerChange(opt.value)}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted shrink-0">
                  <opt.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground">{opt.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trigger-specific config */}
      {trigger === 'time_on_page' && (
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <Label className="text-xs font-semibold">Time on Page (seconds)</Label>
            <div className="flex items-center gap-3">
              <Slider
                value={[(config.seconds as number) ?? 5]}
                onValueChange={([v]) => onConfigChange({ ...config, seconds: v })}
                max={120}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-10 text-right">{(config.seconds as number) ?? 5}s</span>
            </div>
          </CardContent>
        </Card>
      )}

      {trigger === 'scroll_percentage' && (
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <Label className="text-xs font-semibold">Scroll Percentage</Label>
            <div className="flex items-center gap-3">
              <Slider
                value={[(config.percentage as number) ?? 50]}
                onValueChange={([v]) => onConfigChange({ ...config, percentage: v })}
                max={100}
                min={10}
                step={5}
                className="flex-1"
              />
              <span className="text-sm font-medium w-10 text-right">{(config.percentage as number) ?? 50}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      {trigger === 'click_element' && (
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <Label className="text-xs font-semibold">CSS Selector</Label>
            <Input
              value={(config.selector as string) ?? ''}
              onChange={(e) => onConfigChange({ ...config, selector: e.target.value })}
              placeholder="#my-button, .cta-link"
              className="h-8 text-sm font-mono"
            />
          </CardContent>
        </Card>
      )}

      {trigger === 'inactivity' && (
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <Label className="text-xs font-semibold">Inactivity Timeout (seconds)</Label>
            <div className="flex items-center gap-3">
              <Slider
                value={[(config.inactiveSeconds as number) ?? 30]}
                onValueChange={([v]) => onConfigChange({ ...config, inactiveSeconds: v })}
                max={300}
                min={5}
                step={5}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{(config.inactiveSeconds as number) ?? 30}s</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Common Settings */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <Label className="text-xs font-semibold">Display Settings</Label>
          <Separator />
          <div className="flex items-center justify-between">
            <Label className="text-xs">Don't show again after dismissal</Label>
            <Switch
              checked={(config.dontShowAgain as boolean) ?? false}
              onCheckedChange={(v) => onConfigChange({ ...config, dontShowAgain: v })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Max times to show per session</Label>
            <Input
              type="number"
              value={(config.maxShowCount as number) ?? 1}
              onChange={(e) => onConfigChange({ ...config, maxShowCount: parseInt(e.target.value) || 1 })}
              className="h-8 text-sm w-20"
              min={1}
              max={10}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
