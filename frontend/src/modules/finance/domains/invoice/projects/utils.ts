// @ts-nocheck
// Projects Utils — Zoho Invoice

export function formatProjectNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getProjectStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
