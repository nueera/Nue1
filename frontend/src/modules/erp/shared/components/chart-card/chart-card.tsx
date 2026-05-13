'use client';

import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  period?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, period, children, className }: ChartCardProps) {
  return (
    <div className={cn('border border-glass-border/40 rounded-lg bg-glass-bg/30 p-5 sm:p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {period && (
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>{period}</span>
        )}
      </div>
      {children}
    </div>
  );
}
