'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useScoreLeaderboard } from '@/modules/marketing/hooks/use-lead-scoring';
import { Trophy, Medal, Award, Mail, Phone, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoringLeaderboardProps {
  data?: Array<{
    id: string;
    name: string;
    email: string;
    company?: string;
    score: number;
    rank: number;
  }>;
  isLoading?: boolean;
}

export function ScoringLeaderboard({ data: externalData, isLoading: externalLoading }: ScoringLeaderboardProps) {
  const { data: leaderboardData, isLoading: leaderboardLoading } = useScoreLeaderboard();
  const data = externalData ?? leaderboardData?.data ?? [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@acme.com', company: 'Acme Corp', score: 92, rank: 1 },
    { id: '2', name: 'Michael Chen', email: 'michael@tech.io', company: 'TechIO', score: 88, rank: 2 },
    { id: '3', name: 'Emily Davis', email: 'emily@global.co', company: 'Global Co', score: 85, rank: 3 },
    { id: '4', name: 'James Wilson', email: 'james@startup.dev', company: 'StartupDev', score: 79, rank: 4 },
    { id: '5', name: 'Lisa Anderson', email: 'lisa@enterprise.com', company: 'Enterprise', score: 74, rank: 5 },
    { id: '6', name: 'David Brown', email: 'david@corp.net', company: 'CorpNet', score: 71, rank: 6 },
    { id: '7', name: 'Rachel Kim', email: 'rachel@digital.co', company: 'DigitalCo', score: 68, rank: 7 },
    { id: '8', name: 'Tom Martinez', email: 'tom@solutions.io', company: 'Solutions', score: 63, rank: 8 },
    { id: '9', name: 'Anna White', email: 'anna@creative.co', company: 'Creative', score: 58, rank: 9 },
    { id: '10', name: 'Robert Lee', email: 'robert@data.tech', company: 'DataTech', score: 52, rank: 10 },
  ];
  const isLoading = externalLoading ?? leaderboardLoading;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4 text-amber-500" />;
    if (rank === 2) return <Medal className="h-4 w-4 text-gray-400" />;
    if (rank === 3) return <Award className="h-4 w-4 text-amber-700" />;
    return <span className="text-xs text-muted-foreground w-4 text-center">{rank}</span>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 dark:bg-red-950/30';
    if (score >= 60) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30';
    return 'text-blue-600 bg-blue-50 dark:bg-blue-950/30';
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          Top Scored Leads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs w-10">Rank</TableHead>
                <TableHead className="text-xs">Lead</TableHead>
                <TableHead className="text-xs">Building2</TableHead>
                <TableHead className="text-xs text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((lead, index) => (
                <motion.tr
                  // @ts-expect-error — Property 'id' does not exist on type '{ id: string; name: st...
                  key={lead.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.03 }}
                  className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  {/* @ts-expect-error */}
                  <TableCell className="py-2.5">{getRankIcon(lead.rank)}</TableCell>
                  <TableCell className="py-2.5">
                    <div>
                      <p className="text-sm font-medium text-foreground">{lead.name}</p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </div>
                    </div>
                  </TableCell>
                  {/* @ts-expect-error */}
                  <TableCell className="py-2.5 text-xs text-muted-foreground">{lead.company ?? '—'}</TableCell>
                  <TableCell className="py-2.5 text-right">
                    <Badge variant="secondary" className={cn('text-xs font-semibold', getScoreColor(lead.score))}>
                      {lead.score}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
