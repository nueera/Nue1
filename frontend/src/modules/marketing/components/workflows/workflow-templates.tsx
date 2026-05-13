'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Plus, ArrowRight, Mail, MessageSquare, Tag, Users, Clock, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const TEMPLATES = [
  {
    id: '1',
    name: 'Welcome Series',
    description: 'Send a welcome email when someone joins your list',
    trigger: 'list_joined',
    steps: ['Send Welcome Email', 'Wait 2 days', 'Send Product Tour', 'Wait 3 days', 'Send Special Offer'],
    category: 'Onboarding',
  },
  {
    id: '2',
    name: 'Abandoned Cart Recovery',
    description: 'Recover abandoned carts with automated reminders',
    trigger: 'form_submitted',
    steps: ['Wait 1 hour', 'Send Cart Reminder Email', 'Wait 24 hours', 'Send SMS Reminder', 'Wait 48 hours', 'Send Discount Offer'],
    category: 'E-Commerce',
  },
  {
    id: '3',
    name: 'Lead Nurturing',
    description: 'Nurture leads through a series of educational emails',
    trigger: 'form_submitted',
    steps: ['Send Confirmation', 'Wait 1 day', 'Add "Lead" Tag', 'Send Educational Email', 'Wait 3 days', 'Send Case Study', 'Check Score'],
    category: 'Lead Management',
  },
  {
    id: '4',
    name: 'Re-engagement',
    description: 'Win back inactive subscribers',
    trigger: 'score_threshold',
    steps: ['Check Last Activity', 'Send Re-engagement Email', 'Wait 7 days', 'Check Engagement', 'Send Final Notice', 'Remove if Inactive'],
    category: 'Retention',
  },
  {
    id: '5',
    name: 'Post-Purchase Follow-up',
    description: 'Follow up with customers after purchase',
    trigger: 'api_call',
    steps: ['Send Thank You', 'Wait 3 days', 'Send Review Request', 'Wait 7 days', 'Send Cross-sell Offer'],
    category: 'E-Commerce',
  },
  {
    id: '6',
    name: 'Event Registration',
    description: 'Automate event registration follow-ups',
    trigger: 'form_submitted',
    steps: ['Send Confirmation', 'Add to Event List', 'Wait 7 days', 'Send Reminder', 'Wait 1 day', 'Send Final Reminder'],
    category: 'Events',
  },
];

interface WorkflowTemplatesProps {
  onUseTemplate?: (templateId: string) => void;
}

export function WorkflowTemplates({ onUseTemplate }: WorkflowTemplatesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Workflow Templates</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TEMPLATES.map((template, idx) => (
          <motion.div key={template.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold">{template.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{template.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{template.category}</Badge>
                </div>

                <div className="space-y-1 mb-3">
                  <p className="text-xs text-muted-foreground font-medium">Steps:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.steps.map((step, i) => (
                      <span key={i} className="flex items-center gap-0.5 text-xs">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{step}</Badge>
                        {i < template.steps.length - 1 && <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full" onClick={() => onUseTemplate?.(template.id)}>
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
