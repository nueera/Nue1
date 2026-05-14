// @ts-nocheck
// Transactions Utils — Zoho Checkout

export function formatTransactionNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getTransactionStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
