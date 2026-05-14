// @ts-nocheck
// Advances Utils — Zoho Expense

export function formatAdvanceNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getAdvanceStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
