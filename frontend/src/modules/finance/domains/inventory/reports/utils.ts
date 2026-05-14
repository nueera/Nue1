// @ts-nocheck
// Reports Utils — Zoho Inventory

export function formatReportNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getReportStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
