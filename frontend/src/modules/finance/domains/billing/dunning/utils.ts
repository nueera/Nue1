// @ts-nocheck
// Dunning Utils — Zoho Billing

export function formatDunningNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getDunningStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
