// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Mail,
  MessageSquare,
  GitBranch,
  Clock,
  Webhook,
  Tag,
  UserPlus,
  ArrowRight,
} from 'lucide-react';
// framer-motion removed — using CSS transitions for better performance

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay';
  label: string;
  sublabel?: string;
  config?: Record<string, unknown>;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface WorkflowCanvasProps {
  name?: string;
  nodes: WorkflowNode[];
  edges?: WorkflowEdge[];
  className?: string;
}

const NODE_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; color: string; bg: string; border: string }> = {
  trigger: {
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800/40',
  },
  condition: {
    icon: GitBranch,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800/40',
  },
  action: {
    icon: Mail,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800/40',
  },
  delay: {
    icon: Clock,
    color: 'text-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-800/40',
  },
};

const ACTION_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  send_email: Mail,
  send_sms: MessageSquare,
  add_tag: Tag,
  add_to_list: UserPlus,
  webhook: Webhook,
  wait: Clock,
};

function getActionIcon(label: string) {
  const lower = label.toLowerCase();
  for (const [key, icon] of Object.entries(ACTION_ICONS)) {
    if (lower.includes(key) || lower.includes(key.replace('_', ' '))) return icon;
  }
  return Mail;
}

const DEFAULT_NODES: WorkflowNode[] = [
  { id: 'n1', type: 'trigger', label: 'Form Submitted', sublabel: 'Signup form entry' },
  { id: 'n2', type: 'condition', label: 'Lead Score > 50', sublabel: 'Score threshold check' },
  { id: 'n3', type: 'action', label: 'Send Welcome Email', sublabel: 'Template: Welcome Series' },
  { id: 'n4', type: 'delay', label: 'Wait 2 days', sublabel: 'Delay before next step' },
  { id: 'n5', type: 'action', label: 'Send SMS Follow-up', sublabel: 'Engagement nudge' },
];

export function WorkflowCanvas({ name, nodes = DEFAULT_NODES, className }: WorkflowCanvasProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <Card className={cn('border-border/50', className)}>
        {name && (
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{name}</CardTitle>
          </CardHeader>
        )}
        <CardContent className={cn('p-4', name && 'pt-0')}>
          <div className="flex flex-col items-center gap-0">
            {nodes.map((node, index) => {
              const config = NODE_CONFIG[node.type] ?? NODE_CONFIG.action;
              const Icon = node.type === 'action' ? getActionIcon(node.label) : config.icon;
              const isLast = index === nodes.length - 1;

              return (
                <React.Fragment key={node.id}>
                  <div
                    className={cn(
                      'w-full max-w-xs rounded-xl border px-4 py-3 animate-in fade-in duration-200',
                      config.bg,
                      config.border
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex items-center justify-center w-8 h-8 rounded-lg bg-white/60 dark:bg-black/20',
                          config.color
                        )}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground truncate">
                            {node.label}
                          </span>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 capitalize">
                            {node.type}
                          </Badge>
                        </div>
                        {node.sublabel && (
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            {node.sublabel}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="flex flex-col items-center py-1">
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40 rotate-90" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
