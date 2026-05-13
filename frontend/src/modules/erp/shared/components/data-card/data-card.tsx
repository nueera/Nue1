'use client';

import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function DataCard({ title, children, className, action }: DataCardProps) {
  return (
    <div className={cn('border border-glass-border/40 bg-glass-bg/20 rounded-lg p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}
