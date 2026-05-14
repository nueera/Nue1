// @ts-nocheck
// Shipments Utils — Zoho Inventory

export function formatShipmentNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getShipmentStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
