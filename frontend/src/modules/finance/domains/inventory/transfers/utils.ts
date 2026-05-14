// @ts-nocheck
// Transfers Utils — Zoho Inventory

export function formatTransferNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getTransferStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
