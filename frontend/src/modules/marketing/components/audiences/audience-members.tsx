'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAudienceMembers } from '@/modules/marketing/hooks/use-audiences';
import type { AudienceMember } from '@/modules/marketing/types';
import {
  Search,
  UserPlus,
  X,
  Upload,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AudienceMembersProps {
  audienceId: string;
  data?: AudienceMember[];
  isLoading?: boolean;
  onAddMember?: () => void;
  onRemoveMember?: (memberId: string) => void;
  onImport?: () => void;
}

const statusColors: Record<string, string> = {
  subscribed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  unsubscribed: 'bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400',
  bounced: 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400',
  complained: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
};

export function AudienceMembers({
  audienceId,
  data: externalData,
  isLoading: externalLoading,
  onAddMember,
  onRemoveMember,
  onImport,
}: AudienceMembersProps) {
  const { data: membersData, isLoading: membersLoading } = useAudienceMembers(audienceId);
  const data = externalData ?? membersData?.data ?? [];
  const isLoading = externalLoading ?? membersLoading;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredData = data.filter((m) => {
    if (search) {
      return m.source.toLowerCase().includes(search.toLowerCase()) || m.contactId.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 w-full sm:max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search members..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        <div className="flex items-center gap-2">
          {onImport && (
            <Button variant="outline" size="sm" onClick={onImport}>
              <Upload className="h-3.5 w-3.5 mr-1" />Import
            </Button>
          )}
          {onAddMember && (
            <Button size="sm" onClick={onAddMember}>
              <UserPlus className="h-3.5 w-3.5 mr-1" />Add Member
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <Card className="border-border/50">
        <ScrollArea className="max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Contact</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Source</TableHead>
                <TableHead className="text-xs">Added</TableHead>
                <TableHead className="text-xs w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-xs">{member.contactId.slice(0, 8)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn('text-[10px]', statusColors[member.status])}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{member.source}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(member.addedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {onRemoveMember && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => onRemoveMember(member.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    )}
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
          <p className="text-xs text-muted-foreground">Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filteredData.length)} of {filteredData.length}</p>
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
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No members found</p>
        </div>
      )}
    </div>
  );
}
