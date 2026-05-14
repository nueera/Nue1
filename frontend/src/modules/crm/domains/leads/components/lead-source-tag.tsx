// @ts-nocheck
'use client';

import { LEAD_SOURCES } from '../constants';
import type { LeadSource } from '../types';

interface LeadSourceTagProps {
  source: LeadSource;
}

export function LeadSourceTag({ source }: LeadSourceTagProps) {
  const info = LEAD_SOURCES.find(s => s.value === source);

  return (
    <span className="text-xs font-medium px-2 py-1 rounded-full bg-glass-bg text-muted-foreground border border-glass-border">
      {info?.label ?? source}
    </span>
  );
}
