// Addons Utils — Zoho Billing

export function formatAddonNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getAddonStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
