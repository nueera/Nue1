// @ts-nocheck
// Subscriptions Utils — Zoho Billing

export function formatSubscriptionNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getSubscriptionStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
