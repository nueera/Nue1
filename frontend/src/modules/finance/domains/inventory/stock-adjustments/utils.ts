// @ts-nocheck
// StockAdjustments Utils — Zoho Inventory

export function formatStockAdjustmentNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getStockAdjustmentStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
