// Warehouses Utils — Zoho Inventory

export function formatWarehouseNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getWarehouseStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
