// PettyCash Utils — Zoho Expense

export function formatPettyCashNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPettyCashStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
