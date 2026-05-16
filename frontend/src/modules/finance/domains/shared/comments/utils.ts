// Comments Utils — Cross-product

export function formatCommentNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getCommentStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
