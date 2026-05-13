'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoringHistoryProps {
  leadId?: string;
  data?: Array<{
    id: string;
    ruleName: string;
    points: number;
    isPositive: boolean;
    totalScore: number;
    timestamp: string;
    criteria: string;
  }>;
}

export function ScoringHistory({ leadId, data: externalData }: ScoringHistoryProps) {
  const data = externalData ?? [
    { id: '1', ruleName: 'Opened Email Campaign', points: 5, isPositive: true, totalScore: 85, timestamp: '2024-01-15T10:30:00Z', criteria: 'email_engagement' },
    { id: '2', ruleName: 'Visited Pricing Page', points: 10, isPositive: true, totalScore: 80, timestamp: '2024-01-14T14:20:00Z', criteria: 'web_activity' },
    { id: '3', ruleName: 'Unsubscribed', points: -15, isPositive: false, totalScore: 70, timestamp: '2024-01-13T09:15:00Z', criteria: 'email_engagement' },
    { id: '4', ruleName: 'Downloaded Whitepaper', points: 10, isPositive: true, totalScore: 85, timestamp: '2024-01-12T16:45:00Z', criteria: 'behavioral' },
    { id: '5', ruleName: 'Job Title Match', points: 8, isPositive: true, totalScore: 75, timestamp: '2024-01-11T11:00:00Z', criteria: 'demographic_fit' },
    { id: '6', ruleName: 'Clicked Email Link', points: 5, isPositive: true, totalScore: 67, timestamp: '2024-01-10T08:30:00Z', criteria: 'email_engagement' },
    { id: '7', ruleName: 'Form Submission', points: 15, isPositive: true, totalScore: 62, timestamp: '2024-01-09T13:15:00Z', criteria: 'web_activity' },
  ];

  const criteriaColors: Record<string, string> = {
    email_engagement: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
    web_activity: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
    social_engagement: 'bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400',
    demographic_fit: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
    behavioral: 'bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400',
    custom: 'bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400',
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Score Change Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-96">
          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

            {data.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: index * 0.03 }}
                className="relative pb-4 last:pb-0"
              >
                {/* Timeline dot */}
                <div className={cn(
                  'absolute left-[-18px] top-1.5 w-[9px] h-[9px] rounded-full border-2 border-background',
                  entry.isPositive ? 'bg-emerald-500' : 'bg-red-500'
                )} />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{entry.ruleName}</p>
                      <Badge variant="secondary" className={cn('text-[9px] shrink-0', criteriaColors[entry.criteria] ?? '')}>
                        {entry.criteria.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn(
                      'flex items-center gap-0.5 text-sm font-semibold',
                      entry.isPositive ? 'text-emerald-600' : 'text-red-600'
                    )}>
                      {entry.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {entry.isPositive ? '+' : ''}{entry.points}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Total: {entry.totalScore}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
