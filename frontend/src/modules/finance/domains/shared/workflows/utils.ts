// @ts-nocheck
// Workflows Utils — Cross-product

export function formatWorkflowNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getWorkflowStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
