// Contacts Utils — Cross-product

export function formatContactNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getContactStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
