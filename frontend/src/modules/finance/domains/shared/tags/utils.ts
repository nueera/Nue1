// Tags Utils — Cross-product

export function formatTagNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getTagStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
