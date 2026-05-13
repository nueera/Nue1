'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

/* ============================================================
   MODULE COLOR MAP
   ============================================================ */

const MODULE_ACCENT_MAP: Record<string, string> = {
  erp: 'var(--module-erp)',
  crm: 'var(--module-crm)',
  finance: 'var(--module-finance)',
  marketing: 'var(--module-marketing)',
  analytics: 'var(--module-analytics)',
  automation: 'var(--module-automation)',
  retention: 'var(--module-retention)',
  settings: 'var(--module-settings)',
};

function getModuleColor(moduleId?: string): string {
  if (!moduleId) return 'var(--module-erp)';
  return MODULE_ACCENT_MAP[moduleId] ?? 'var(--module-erp)';
}

/* ============================================================
   SKELETON SHIMMER LINE
   ============================================================ */

interface SkeletonLineProps {
  width?: string;
  height?: string;
  className?: string;
  moduleId?: string;
}

function SkeletonLine({ width = '100%', height = '14px', className, moduleId }: SkeletonLineProps) {
  const accentColor = getModuleColor(moduleId);

  return (
    <div
      className={cn('skeleton-shimmer rounded-md', className)}
      style={{
        width,
        height,
        // Override shimmer gradient with module accent color
        background: `linear-gradient(90deg, var(--skeleton-bg) 0%, color-mix(in oklch, ${accentColor} 15%, var(--skeleton-shine)) 50%, var(--skeleton-bg) 100%)`,
        backgroundSize: '200% 100%',
      }}
    />
  );
}

/* ============================================================
   SKELETON RECTANGLE
   ============================================================ */

interface SkeletonRectProps {
  width?: string;
  height?: string;
  className?: string;
  moduleId?: string;
}

function SkeletonRect({ width = '100%', height = '80px', className, moduleId }: SkeletonRectProps) {
  const accentColor = getModuleColor(moduleId);

  return (
    <div
      className={cn('skeleton-shimmer rounded-lg', className)}
      style={{
        width,
        height,
        background: `linear-gradient(90deg, var(--skeleton-bg) 0%, color-mix(in oklch, ${accentColor} 15%, var(--skeleton-shine)) 50%, var(--skeleton-bg) 100%)`,
        backgroundSize: '200% 100%',
      }}
    />
  );
}

/* ============================================================
   TABLE VARIANT
   ============================================================ */

function TableSkeleton({ moduleId, rows }: { moduleId?: string; rows: number }) {
  return (
    <div className="w-full space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-glass-border">
        <SkeletonLine width="8%" height="12px" moduleId={moduleId} />
        <SkeletonLine width="25%" height="12px" moduleId={moduleId} />
        <SkeletonLine width="20%" height="12px" moduleId={moduleId} />
        <SkeletonLine width="15%" height="12px" moduleId={moduleId} />
        <SkeletonLine width="12%" height="12px" moduleId={moduleId} />
        <SkeletonLine width="10%" height="12px" moduleId={moduleId} />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center py-2">
          <SkeletonLine width="8%" height="12px" moduleId={moduleId} />
          <SkeletonLine width={`${20 + Math.random() * 10}%`} height="14px" moduleId={moduleId} />
          <SkeletonLine width={`${15 + Math.random() * 10}%`} height="14px" moduleId={moduleId} />
          <SkeletonLine width={`${10 + Math.random() * 10}%`} height="14px" moduleId={moduleId} />
          <SkeletonLine width="12%" height="12px" moduleId={moduleId} />
          <SkeletonLine width="10%" height="12px" moduleId={moduleId} />
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   CARD-GRID VARIANT
   ============================================================ */

function CardGridSkeleton({ moduleId, columns }: { moduleId?: string; columns: number }) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: columns * 2 }).map((_, i) => (
        <div
          key={i}
          className="glass-surface rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <SkeletonRect width="32px" height="32px" moduleId={moduleId} className="rounded-full" />
            <div className="flex-1 space-y-1.5">
              <SkeletonLine width="60%" height="12px" moduleId={moduleId} />
              <SkeletonLine width="40%" height="10px" moduleId={moduleId} />
            </div>
          </div>
          <SkeletonLine width="90%" height="14px" moduleId={moduleId} />
          <SkeletonLine width="70%" height="14px" moduleId={moduleId} />
          <div className="flex gap-2 pt-1">
            <SkeletonLine width="30%" height="8px" moduleId={moduleId} />
            <SkeletonLine width="20%" height="8px" moduleId={moduleId} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   DETAIL VARIANT
   ============================================================ */

function DetailSkeleton({ moduleId }: { moduleId?: string }) {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <SkeletonRect width="56px" height="56px" moduleId={moduleId} className="rounded-xl" />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="40%" height="20px" moduleId={moduleId} />
          <SkeletonLine width="25%" height="12px" moduleId={moduleId} />
          <div className="flex gap-2 pt-1">
            <SkeletonLine width="80px" height="24px" moduleId={moduleId} className="rounded-full" />
            <SkeletonLine width="60px" height="24px" moduleId={moduleId} className="rounded-full" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-glass-border pb-2">
        <SkeletonLine width="60px" height="12px" moduleId={moduleId} />
        <SkeletonLine width="80px" height="12px" moduleId={moduleId} />
        <SkeletonLine width="70px" height="12px" moduleId={moduleId} />
        <SkeletonLine width="90px" height="12px" moduleId={moduleId} />
      </div>

      {/* Content sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonLine width="30%" height="10px" moduleId={moduleId} />
            <SkeletonLine width="80%" height="14px" moduleId={moduleId} />
            <SkeletonLine width="60%" height="14px" moduleId={moduleId} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   FORM VARIANT
   ============================================================ */

function FormSkeleton({ moduleId }: { moduleId?: string }) {
  return (
    <div className="w-full max-w-2xl space-y-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <SkeletonLine width={`${25 + Math.random() * 15}%`} height="10px" moduleId={moduleId} />
          <SkeletonRect
            width="100%"
            height={i === 5 ? '80px' : '36px'}
            moduleId={moduleId}
            className="rounded-md"
          />
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <SkeletonLine width="100px" height="36px" moduleId={moduleId} className="rounded-md" />
        <SkeletonLine width="80px" height="36px" moduleId={moduleId} className="rounded-md" />
      </div>
    </div>
  );
}

/* ============================================================
   MODULE SKELETON (Main Export)
   ============================================================ */

export type ModuleSkeletonVariant = 'table' | 'card-grid' | 'detail' | 'form';

interface ModuleSkeletonProps {
  variant?: ModuleSkeletonVariant;
  moduleId?: string;
  rows?: number;
  className?: string;
}

export function ModuleSkeleton({
  variant = 'table',
  moduleId,
  rows = 8,
  className,
}: ModuleSkeletonProps) {
  const isMobile = useIsMobile();

  const columns = useMemo(() => {
    if (variant !== 'card-grid') return 1;
    if (isMobile) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, [variant, isMobile]);

  return (
    <div className={cn('w-full', className)}>
      {variant === 'table' && <TableSkeleton moduleId={moduleId} rows={rows} />}
      {variant === 'card-grid' && <CardGridSkeleton moduleId={moduleId} columns={columns} />}
      {variant === 'detail' && <DetailSkeleton moduleId={moduleId} />}
      {variant === 'form' && <FormSkeleton moduleId={moduleId} />}
    </div>
  );
}

export default ModuleSkeleton;
