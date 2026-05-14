// @ts-nocheck
// ============================================================================
// Reports — Utils
// ============================================================================

import type { ReportType } from './types';
import { REPORT_TYPES } from './constants';

export function getReportTypeLabel(type: ReportType): string {
  return REPORT_TYPES.find(r => r.value === type)?.label ?? type;
}

export function getReportCategory(type: ReportType): string {
  return REPORT_TYPES.find(r => r.value === type)?.category ?? 'Other';
}

export function formatDateRange(from: string, to: string): string {
  const f = new Date(from).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const t = new Date(to).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${f} – ${t}`;
}
