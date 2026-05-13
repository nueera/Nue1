'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Plus, Zap, MoreHorizontal, Edit3, Trash2, Play, Pause, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkflows, useDeleteWorkflow, useActivateWorkflow } from '@/modules/marketing/hooks';
import type { Workflow } from '@/modules/marketing/types';

interface WorkflowListProps {
  onCreateWorkflow?: () => void;
  onEditWorkflow?: (workflow: Workflow) => void;
  onViewLogs?: (workflowId: string) => void;
}

const TRIGGER_LABELS: Record<string, string> = {
  form_submitted: 'Form Submitted',
  link_clicked: 'Link Clicked',
  page_visited: 'Page Visited',
  list_joined: 'List Joined',
  tag_added: 'Tag Added',
  field_changed: 'Field Changed',
  score_threshold: 'Score Threshold',
  date_reached: 'Date Reached',
  api_call: 'API Call',
  manual: 'Manual',
};

export function WorkflowList({ onCreateWorkflow, onEditWorkflow, onViewLogs }: WorkflowListProps) {
  const { data: workflowsData, isLoading } = useWorkflows();
  const workflows = workflowsData?.data ?? [];
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = workflows.filter((w) => {
    if (search && !w.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && w.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 w-full sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search workflows..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onCreateWorkflow} size="sm">
          <Plus className="h-4 w-4 mr-2" />New Workflow
        </Button>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Zap className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold">No workflows</h3>
            <p className="text-sm text-muted-foreground mt-1">Create automated workflows to streamline your marketing.</p>
            <Button className="mt-4" size="sm" onClick={onCreateWorkflow}><Plus className="h-4 w-4 mr-2" />New Workflow</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((workflow, idx) => (
            <motion.div key={workflow.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
              onClick={() => onEditWorkflow?.(workflow)}
            >
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/30">
                <Zap className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{workflow.name}</p>
                <p className="text-xs text-muted-foreground">
                  {TRIGGER_LABELS[workflow.trigger] ?? workflow.trigger} · {workflow.actions.length} actions
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{workflow.executionCount} runs</span>
                <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'} className="text-xs">{workflow.status}</Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEditWorkflow?.(workflow); }}><Edit3 className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onViewLogs?.(workflow.id); }}>View Logs</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
