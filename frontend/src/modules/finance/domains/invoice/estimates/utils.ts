// @ts-nocheck
// Estimates Utils — Zoho Invoice

export function formatEstimateNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getEstimateStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
