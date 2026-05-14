// @ts-nocheck
// Plans Utils — Zoho Billing

export function formatPlanNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPlanStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
