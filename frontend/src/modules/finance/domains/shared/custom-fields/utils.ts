// @ts-nocheck
// CustomFields Utils — Cross-product

export function formatCustomFieldNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getCustomFieldStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
