// PerDiem Utils — Zoho Expense

export function formatPerDiemNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPerDiemStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
