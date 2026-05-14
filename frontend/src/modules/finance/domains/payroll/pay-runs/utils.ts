// @ts-nocheck
// PayRuns Utils — Zoho Payroll

export function formatPayRunNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPayRunStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
