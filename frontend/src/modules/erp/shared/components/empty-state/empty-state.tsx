'use client';

import { FileX } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon = FileX, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-10 w-10 text-muted-foreground/20 mb-4" strokeWidth={1.5} />
      <p className="font-medium text-foreground" style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}>
        {title}
      </p>
      {description && (
        <p className="text-muted-foreground mt-1 max-w-sm" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 rounded-lg bg-module-erp text-white text-sm hover:bg-module-erp/90 press-scale transition-colors duration-[var(--motion-fast)]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
