// Approvals Utils — Zoho Expense

export function formatApprovalNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getApprovalStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
