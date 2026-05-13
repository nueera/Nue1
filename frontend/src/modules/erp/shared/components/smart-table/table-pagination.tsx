'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TablePaginationProps {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

export function TablePagination({
  pageIndex,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}: TablePaginationProps) {
  if (pageCount <= 0) return null;

  return (
    <div className="border border-glass-border/50 rounded-lg bg-glass-bg/30 px-3 py-2.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
          Rows per page
        </p>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-glass-bg border border-glass-border/50 rounded-md px-2 py-1 text-sm text-foreground outline-none"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <p className="text-muted-foreground hidden sm:block" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
        Page {pageIndex + 1} of {pageCount}
      </p>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={() => onPageChange(pageIndex - 1)} disabled={pageIndex === 0} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={() => onPageChange(pageIndex + 1)} disabled={pageIndex >= pageCount - 1} aria-label="Next page">
          <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
        </Button>
      </div>
    </div>
  );
}
