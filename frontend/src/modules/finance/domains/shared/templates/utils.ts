// @ts-nocheck
// Templates Utils — Cross-product

export function formatTemplateNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getTemplateStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
