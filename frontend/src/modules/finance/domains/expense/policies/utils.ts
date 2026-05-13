// Policies Utils — Zoho Expense

export function formatPolicieNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPolicieStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
