// SalesOrders Utils — Zoho Inventory

export function formatSalesOrderNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getSalesOrderStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
