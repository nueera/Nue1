// BatchTracking Utils — Zoho Inventory

export function formatBatchTrackingNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getBatchTrackingStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
