// @ts-nocheck
// ============================================================================
// Export Utils — CSV, PDF, Leads, Campaign Report export utilities
// ============================================================================

import type { Lead, Campaign, CampaignMetrics } from '../types';

/**
 * Export data to CSV format
 */
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: Array<{ key: keyof T; label: string }>
): void {
  if (data.length === 0) return;

  const cols = columns ?? Object.keys(data[0]).map((key) => ({
    key: key as keyof T,
    label: String(key),
  }));

  const header = cols.map((c) => `"${c.label}"`).join(',');
  const rows = data.map((row) =>
    cols
      .map((c) => {
        const value = row[c.key];
        if (value === null || value === undefined) return '""';
        if (Array.isArray(value)) return `"${value.join('; ')}"`;
        if (typeof value === 'object') return `"${JSON.stringify(value)}"`;
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  const csv = [header, ...rows].join('\n');
  downloadFile(csv, `${filename}.csv`, 'text/csv');
}

/**
 * Export data to PDF format (simplified — generates a printable HTML)
 */
export function exportToPDF(
  title: string,
  content: string,
  filename: string
): void {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; }
        h1 { color: #1a1a1a; font-size: 24px; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { padding: 8px 12px; border: 1px solid #e5e7eb; text-align: left; }
        th { background: #f9fafb; font-weight: 600; }
        .meta { color: #6b7280; font-size: 14px; margin-bottom: 8px; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="meta">Generated on ${new Date().toLocaleString()}</div>
      ${content}
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}

/**
 * Export leads to CSV
 */
export function exportLeads(leads: Lead[]): void {
  exportToCSV(leads, 'leads-export', [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'company', label: 'Company' },
    { key: 'source', label: 'Source' },
    { key: 'stage', label: 'Stage' },
    { key: 'status', label: 'Status' },
    { key: 'tags', label: 'Tags' },
    { key: 'createdAt', label: 'Created At' },
  ]);
}

/**
 * Export campaign report to HTML (for PDF)
 */
export function exportCampaignReport(campaign: Campaign, metrics: CampaignMetrics): void {
  const tableRows = Object.entries(metrics)
    .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
    .join('');

  const content = `
    <h2>${campaign.name}</h2>
    <p>Type: ${campaign.type} | Channel: ${campaign.channel} | Status: ${campaign.status}</p>
    <table>
      <thead><tr><th>Metric</th><th>Value</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;

  exportToPDF(`Campaign Report: ${campaign.name}`, content, `campaign-report-${campaign.id}`);
}

/**
 * Helper to trigger a file download in the browser
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
