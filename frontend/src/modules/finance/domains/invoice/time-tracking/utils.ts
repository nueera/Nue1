// @ts-nocheck
// TimeTracking Utils — Zoho Invoice

export function formatTimeTrackingNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getTimeTrackingStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
