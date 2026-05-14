// @ts-nocheck
// Trips Utils — Zoho Expense

export function formatTripNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getTripStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
