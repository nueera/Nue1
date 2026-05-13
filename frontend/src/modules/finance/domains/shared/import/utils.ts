// Import Utils — Cross-product

export function formatImportNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getImportStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
