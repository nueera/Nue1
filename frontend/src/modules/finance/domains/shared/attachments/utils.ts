// @ts-nocheck
// Attachments Utils — Cross-product

export function formatAttachmentNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getAttachmentStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
