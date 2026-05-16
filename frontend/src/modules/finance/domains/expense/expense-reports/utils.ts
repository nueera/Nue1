// ExpenseReports Utils — Zoho Expense

export function formatExpenseReportNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getExpenseReportStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
