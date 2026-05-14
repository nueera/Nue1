// @ts-nocheck
// Items Utils — Zoho Inventory

export function formatItemNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getItemStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
