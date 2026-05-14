// @ts-nocheck
// ============================================================================
// CRM Module — Shared Utilities
// ============================================================================

import type { CrmModuleName, Currency } from './types';
import { CURRENCY_OPTIONS, CRM_MODULES } from './constants';

// --- Currency Formatting ---

export function formatCurrency(value: number, currency: Currency = 'USD'): string {
  const currencyInfo = CURRENCY_OPTIONS.find((c) => c.value === currency);
  const symbol = currencyInfo?.symbol ?? '$';
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
  return `${symbol}${formatted}`;
}

// --- Deal Value Calculation ---

export function calculateDealValue(amount: number, probability: number): number {
  return amount * (probability / 100);
}

export function computeWeightedPipeline(deals: { amount: number; probability: number }[]): number {
  return deals.reduce((sum, deal) => sum + calculateDealValue(deal.amount, deal.probability), 0);
}

// --- Win Probability ---

export function computeWinProbability(stage: string, stageProbabilities: Record<string, number>): number {
  return stageProbabilities[stage] ?? 0;
}

// --- Record Deduplication ---

export function deduplicateRecords<T extends { id: string }>(records: T[]): T[] {
  const seen = new Set<string>();
  return records.filter((record) => {
    if (seen.has(record.id)) return false;
    seen.add(record.id);
    return true;
  });
}

// --- Name Utilities ---

export function parseFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' ') ?? '',
  };
}

export function buildFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

// --- Email Validation ---

export function validateEmailDomain(email: string, allowedDomains?: string[]): boolean {
  if (!allowedDomains || allowedDomains.length === 0) return true;
  const domain = email.split('@')[1];
  if (!domain) return false;
  return allowedDomains.includes(domain);
}

// --- Record URL Generation ---

export function generateRecordUrl(moduleName: CrmModuleName, recordId: string): string {
  const moduleInfo = CRM_MODULES.find((m) => m.name === moduleName);
  if (!moduleInfo) return '#';
  return `${moduleInfo.path}/${recordId}`;
}

// --- Module Icon Mapping ---

export function getModuleIcon(moduleName: CrmModuleName): string {
  const moduleInfo = CRM_MODULES.find((m) => m.name === moduleName);
  return moduleInfo?.icon ?? 'Circle';
}

// --- Date Formatting ---

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// --- Percentage Formatting ---

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// --- Phone Formatting ---

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

// --- Truncate Text ---

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// --- Slug Generation ---

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// --- Overdue Check ---

export function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}

// --- Stale Check (no activity in N days) ---

export function isStale(updatedAt: string, staleDays = 30): boolean {
  const lastActivity = new Date(updatedAt);
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - staleDays);
  return lastActivity < threshold;
}
