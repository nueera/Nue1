'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { JourneyNodeType } from '@/modules/marketing/types';
import {
  Zap,
  Mail,
  MessageSquare,
  Phone,
  Clock,
  GitBranch,
  Settings,
  LogOut,
  GripVertical,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface JourneyNodePaletteProps {
  onAddNode?: (type: JourneyNodeType) => void;
}

const nodeTypes: Array<{
  type: JourneyNodeType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}> = [
  { type: 'trigger', label: 'Trigger', icon: Zap, color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-950/30' },
  { type: 'email', label: 'Email', icon: Mail, color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950/30' },
  { type: 'sms', label: 'SMS', icon: MessageSquare, color: 'text-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { type: 'whatsapp', label: 'WhatsApp', icon: Phone, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/30' },
  { type: 'delay', label: 'Wait', icon: Clock, color: 'text-violet-600', bgColor: 'bg-violet-50 dark:bg-violet-950/30' },
  { type: 'condition', label: 'Condition', icon: GitBranch, color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950/30' },
  { type: 'action', label: 'Action', icon: Settings, color: 'text-gray-600', bgColor: 'bg-gray-50 dark:bg-gray-950/30' },
  { type: 'exit', label: 'Exit', icon: LogOut, color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-950/30' },
];

export function JourneyNodePalette({ onAddNode }: JourneyNodePaletteProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Node Types</h3>
      <div className="space-y-1.5">
        {nodeTypes.map((nt, index) => (
          <motion.div
            key={nt.type}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: index * 0.02 }}
          >
            <Card
              className="cursor-grab hover:shadow-sm transition-all border-border/50 active:cursor-grabbing"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('nodeType', nt.type);
              }}
              onClick={() => onAddNode?.(nt.type)}
            >
              <CardContent className="p-2.5 flex items-center gap-2.5">
                <div className="flex items-center gap-0.5 text-muted-foreground/40">
                  <GripVertical className="h-3.5 w-3.5" />
                </div>
                <div className={cn('flex items-center justify-center w-7 h-7 rounded-md', nt.bgColor)}>
                  <nt.icon className={cn('h-3.5 w-3.5', nt.color)} />
                </div>
                <span className="text-xs font-medium text-foreground">{nt.label}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
