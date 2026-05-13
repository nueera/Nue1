// Expenses Utils — Zoho Expense

export function formatExpenseNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getExpenseStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
