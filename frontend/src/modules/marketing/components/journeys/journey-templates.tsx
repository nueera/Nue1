'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { JourneyNode, JourneyEdge } from '@/modules/marketing/types';
import { Mail, MessageSquare, Clock, GitBranch, Zap } from 'lucide-react';

interface JourneyTemplatesProps {
  onSelectTemplate?: (nodes: JourneyNode[], edges: JourneyEdge[]) => void;
}

const templates: Array<{
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  nodes: JourneyNode[];
  edges: JourneyEdge[];
}> = [
  {
    id: 'welcome',
    name: 'Welcome Series',
    description: 'Send welcome email after list join',
    icon: Mail,
    nodes: [
      { id: 't-1', type: 'trigger', label: 'List Join', config: { triggerType: 'list_entry' }, position: { x: 300, y: 50 } },
      { id: 'w-1', type: 'delay', label: 'Wait', config: { duration: 1, unit: 'hours' }, position: { x: 300, y: 170 } },
      { id: 'e-1', type: 'email', label: 'Welcome Email', config: { subject: 'Welcome!', templateId: 'welcome' }, position: { x: 300, y: 290 } },
      { id: 'x-1', type: 'exit', label: 'Exit', config: {}, position: { x: 300, y: 410 } },
    ],
    edges: [
      { id: 'te-1', source: 't-1', target: 'w-1' },
      { id: 'we-1', source: 'w-1', target: 'e-1' },
      { id: 'ex-1', source: 'e-1', target: 'x-1' },
    ],
  },
  {
    id: 'abandoned',
    name: 'Abandoned Cart',
    description: 'Follow up on abandoned carts',
    icon: Clock,
    nodes: [
      { id: 't-2', type: 'trigger', label: 'Cart Abandoned', config: { triggerType: 'custom_event' }, position: { x: 300, y: 50 } },
      { id: 'w-2', type: 'delay', label: 'Wait 2hrs', config: { duration: 2, unit: 'hours' }, position: { x: 300, y: 170 } },
      { id: 'e-2', type: 'email', label: 'Reminder', config: { subject: 'Your cart is waiting' }, position: { x: 300, y: 290 } },
      { id: 'c-2', type: 'condition', label: 'Purchased?', config: { field: 'purchased', operator: 'equals', value: 'true', yesLabel: 'Yes', noLabel: 'No' }, position: { x: 300, y: 410 } },
      { id: 'x-2', type: 'exit', label: 'Exit', config: {}, position: { x: 300, y: 530 } },
    ],
    edges: [
      { id: 'te-2', source: 't-2', target: 'w-2' },
      { id: 'we-2', source: 'w-2', target: 'e-2' },
      { id: 'ec-2', source: 'e-2', target: 'c-2' },
      { id: 'cx-2', source: 'c-2', target: 'x-2' },
    ],
  },
  {
    id: 'reengagement',
    name: 'Re-engagement',
    description: 'Win back inactive subscribers',
    icon: MessageSquare,
    nodes: [
      { id: 't-3', type: 'trigger', label: 'Inactivity', config: { triggerType: 'custom_event' }, position: { x: 300, y: 50 } },
      { id: 'e-3a', type: 'email', label: 'We Miss You', config: { subject: 'We miss you!' }, position: { x: 300, y: 170 } },
      { id: 'w-3', type: 'delay', label: 'Wait 3 days', config: { duration: 3, unit: 'days' }, position: { x: 300, y: 290 } },
      { id: 'c-3', type: 'condition', label: 'Opened?', config: { field: 'email_opened', yesLabel: 'Yes', noLabel: 'No' }, position: { x: 300, y: 410 } },
      { id: 's-3', type: 'sms', label: 'Last Chance SMS', config: { message: 'Last chance offer!' }, position: { x: 500, y: 410 } },
      { id: 'x-3', type: 'exit', label: 'Exit', config: {}, position: { x: 300, y: 530 } },
    ],
    edges: [
      { id: 'te-3', source: 't-3', target: 'e-3a' },
      { id: 'ew-3', source: 'e-3a', target: 'w-3' },
      { id: 'wc-3', source: 'w-3', target: 'c-3' },
      { id: 'cx-3', source: 'c-3', target: 'x-3', label: 'Yes' },
      { id: 'cs-3', source: 'c-3', target: 's-3', label: 'No' },
    ],
  },
  {
    id: 'lead_scoring',
    name: 'Lead Scoring',
    description: 'Auto-qualify leads based on score',
    icon: GitBranch,
    nodes: [
      { id: 't-4', type: 'trigger', label: 'Score Changed', config: { triggerType: 'score_threshold' }, position: { x: 300, y: 50 } },
      { id: 'c-4', type: 'condition', label: 'Score > 50?', config: { field: 'score', operator: 'greater_than', value: '50' }, position: { x: 300, y: 170 } },
      { id: 'a-4a', type: 'action', label: 'Add Hot Lead Tag', config: { actionType: 'add_tag', value: 'hot-lead' }, position: { x: 150, y: 290 } },
      { id: 'a-4b', type: 'action', label: 'Nurture', config: { actionType: 'add_to_list', value: 'nurture-list' }, position: { x: 450, y: 290 } },
      { id: 'x-4', type: 'exit', label: 'Exit', config: {}, position: { x: 300, y: 410 } },
    ],
    edges: [
      { id: 'tc-4', source: 't-4', target: 'c-4' },
      { id: 'ca-4', source: 'c-4', target: 'a-4a', label: 'Yes' },
      { id: 'cb-4', source: 'c-4', target: 'a-4b', label: 'No' },
    ],
  },
];

export function JourneyTemplates({ onSelectTemplate }: JourneyTemplatesProps) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Journey Templates</h3>
        <p className="text-sm text-muted-foreground mt-1">Start with a pre-built journey and customize it</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <div
            key={template.id}
            className="animate-in fade-in slide-in-from-bottom-2 duration-200"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
          >
            <Card className="hover:shadow-md transition-all border-border/50 cursor-pointer" onClick={() => onSelectTemplate?.(template.nodes, template.edges)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/30">
                    <template.icon className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Zap className="h-3 w-3" />
                  <span>{template.nodes.length} steps</span>
                  <span className="text-border">•</span>
                  <span>{template.edges.length} connections</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
