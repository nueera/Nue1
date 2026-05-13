import { Skeleton } from '@/components/ui/skeleton';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="glass-surface rounded-xl overflow-hidden">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-glass-border/20">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-3.5 flex-1 rounded-lg animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
