'use client';

import { ChevronRight } from 'lucide-react';
import { useNavigation } from '../../core/hooks/use-navigation';

export function Breadcrumb() {
  const { breadcrumbs } = useNavigation();

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="h-3 w-3" strokeWidth={1.8} />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium" style={{ fontSize: 'var(--text-sm)' }}>
              {crumb.label}
            </span>
          ) : (
            <a href={crumb.href} className="hover:text-foreground transition-colors duration-[var(--motion-fast)]" style={{ fontSize: 'var(--text-sm)' }}>
              {crumb.label}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
