// PurchaseRequests Utils — Zoho Expense

export function formatPurchaseRequestNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPurchaseRequestStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
