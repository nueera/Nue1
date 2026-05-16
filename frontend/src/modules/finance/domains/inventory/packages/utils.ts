// Packages Utils — Zoho Inventory

export function formatPackageNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPackageStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
