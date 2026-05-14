// @ts-nocheck
'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, MoreHorizontal, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoneyDisplay } from '../../../components/shared';
import type { ChartOfAccount } from '../types';
import { getAccountTypeLabel, getAccountTypeColor } from '../utils';

interface ChartOfAccountsTreeProps {
  data: ChartOfAccount[];
  isLoading?: boolean;
  onRowClick?: (account: ChartOfAccount) => void;
  onEdit?: (account: ChartOfAccount) => void;
  onDelete?: (account: ChartOfAccount) => void;
  onCreateNew?: () => void;
}

function AccountRow({
  account,
  depth,
  onRowClick,
  onEdit,
  onDelete,
}: {
  account: ChartOfAccount;
  depth: number;
  onRowClick?: (account: ChartOfAccount) => void;
  onEdit?: (account: ChartOfAccount) => void;
  onDelete?: (account: ChartOfAccount) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = account.subAccounts?.length > 0;

  return (
    <>
      <div
        className={cn(
          'flex items-center gap-2 py-2.5 px-3 border-b border-glass-border/50 transition-all duration-150 hover:bg-glass-hover',
          onRowClick && 'cursor-pointer',
        )}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
        onClick={() => onRowClick?.(account)}
      >
        {hasChildren ? (
          <button onClick={e => { e.stopPropagation(); setExpanded(!expanded); }} className="h-5 w-5 flex items-center justify-center rounded hover:bg-muted/50 shrink-0">
            {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="w-5 shrink-0" />
        )}
        <span className="w-16 text-xs text-muted-foreground tabular-nums shrink-0">{account.code}</span>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {hasChildren ? (
            expanded ? <FolderOpen className="h-4 w-4 text-amber-500 shrink-0" /> : <Folder className="h-4 w-4 text-amber-500 shrink-0" />
          ) : (
            <span className="w-4 shrink-0" />
          )}
          <span className={cn('text-sm truncate', !account.isActive && 'text-muted-foreground line-through')}>{account.name}</span>
        </div>
        <Badge variant="outline" className={cn('text-[10px] font-medium shrink-0', getAccountTypeColor(account.type))}>
          {getAccountTypeLabel(account.type)}
        </Badge>
        <MoneyDisplay amount={account.balance.amount} currency={account.balance.currency} size="sm" className="w-28 text-right shrink-0" />
        {!account.isActive && (
          <Badge variant="outline" className="text-[10px] shrink-0 bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-600">Inactive</Badge>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={e => e.stopPropagation()}>
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onEdit?.(account); }}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onDelete?.(account); }} className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {hasChildren && expanded && account.subAccounts.map(child => (
        <AccountRow key={child.id} account={child} depth={depth + 1} onRowClick={onRowClick} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
  );
}

export function ChartOfAccountsTree({ data, isLoading, onRowClick, onEdit, onDelete, onCreateNew }: ChartOfAccountsTreeProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{data.length} account groups</p>
        {onCreateNew && (
          <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-1" />New Account
          </Button>
        )}
      </div>
      <div className="glass-surface border border-glass-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 py-2.5 px-3 border-b border-glass-border bg-muted/30">
          <span className="w-5 shrink-0" />
          <span className="w-16 text-xs uppercase tracking-widest text-muted-foreground/70 font-medium shrink-0">Code</span>
          <span className="flex-1 text-xs uppercase tracking-widest text-muted-foreground/70 font-medium min-w-0">Name</span>
          <span className="w-16 text-xs uppercase tracking-widest text-muted-foreground/70 font-medium shrink-0">Type</span>
          <span className="w-28 text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right shrink-0">Balance</span>
          <span className="w-7 shrink-0" />
        </div>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="py-3 px-3 border-b border-glass-border/50">
                <Skeleton className="h-3.5 w-full max-w-[300px] rounded-lg" />
              </div>
            ))
          : data.length > 0
            ? data.map(account => (
                <AccountRow key={account.id} account={account} depth={0} onRowClick={onRowClick} onEdit={onEdit} onDelete={onDelete} />
              ))
            : (
                <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                  No accounts found
                </div>
              )}
      </div>
    </div>
  );
}
