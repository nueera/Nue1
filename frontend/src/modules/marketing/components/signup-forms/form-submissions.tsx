'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MetricCard } from '@/modules/marketing/components/shared';
import { useFormSubmissions } from '@/modules/marketing/hooks';
import type { FormSubmission } from '@/modules/marketing/types';
import {
  Search,
  Download,
  Inbox,
  Clock,
  Globe,
  Monitor,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FormSubmissionsProps {
  formId: string;
  data?: FormSubmission[];
  isLoading?: boolean;
  onExport?: (format: 'csv' | 'json') => void;
}

export function FormSubmissions({ formId, data: externalData, isLoading: externalLoading, onExport }: FormSubmissionsProps) {
  const { data: submissionsData, isLoading: submissionsLoading } = useFormSubmissions(formId);
  const data = externalData ?? submissionsData?.data ?? [];
  const isLoading = externalLoading ?? submissionsLoading;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredData = data.filter((sub) => {
    if (search) {
      const values = Object.values(sub.data).join(' ').toLowerCase();
      return values.includes(search.toLowerCase());
    }
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // Get all unique field keys
  const allKeys = Array.from(new Set(data.flatMap((sub) => Object.keys(sub.data))));

  const totalSubmissions = data.length;
  const todaySubmissions = data.filter((s) => {
    const d = new Date(s.submittedAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;
  const uniqueIPs = new Set(data.map((s) => s.ipAddress)).size;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard
          icon={Inbox}
          title="Total Submissions"
          value={totalSubmissions.toLocaleString()}
          accentColor="text-violet-600"
          accentBg="bg-violet-50 dark:bg-violet-950/30"
        />
        <MetricCard
          icon={Clock}
          title="Today"
          value={todaySubmissions.toString()}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={Globe}
          title="Unique IPs"
          value={uniqueIPs.toString()}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-md">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search submissions..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {onExport && (
            <>
              <Button variant="outline" size="sm" onClick={() => onExport('csv')}>
                <Download className="h-3.5 w-3.5 mr-1" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => onExport('json')}>
                <Download className="h-3.5 w-3.5 mr-1" />
                JSON
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <Card className="border-border/50">
        <ScrollArea className="max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                {allKeys.map((key) => (
                  <TableHead key={key} className="text-xs whitespace-nowrap">{key}</TableHead>
                ))}
                <TableHead className="text-xs">IP</TableHead>
                <TableHead className="text-xs">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((sub, idx) => (
                <TableRow key={sub.id}>
                  {allKeys.map((key) => (
                    <TableCell key={key} className="text-sm whitespace-nowrap">
                      {sub.data[key] ?? '—'}
                    </TableCell>
                  ))}
                  <TableCell className="text-xs text-muted-foreground">{sub.ipAddress ?? '—'}</TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filteredData.length)} of {filteredData.length}
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Inbox className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No submissions yet</p>
          <p className="text-xs mt-1">Submissions will appear here once your form is live</p>
        </div>
      )}
    </div>
  );
}
