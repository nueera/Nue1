// @ts-nocheck
// ============================================================================
// Export Utilities
// PDF and CSV export helpers for the Finance module.
// ============================================================================

// ---------------------------------------------------------------------------
// CSV Export
// ---------------------------------------------------------------------------

export interface CsvExportOptions {
  /** Column headers */
  headers: string[];
  /** Data rows (array of arrays matching headers) */
  rows: string[][];
  /** File name (without extension) */
  filename: string;
  /** Include BOM for Excel UTF-8 compatibility */
  includeBOM?: boolean;
}

/**
 * Convert data to CSV string.
 *
 * @example
 * toCsv({
 *   headers: ['Invoice #', 'Amount', 'Status'],
 *   rows: [['INV-001', '$1,000.00', 'Paid'], ['INV-002', '$500.00', 'Pending']],
 * })
 */
export function toCsv(options: CsvExportOptions): string {
  const { headers, rows, includeBOM = true } = options;

  const escapeCsvField = (field: string): string => {
    // If the field contains a comma, quote, or newline, wrap it in quotes
    if (/[",\n\r]/.test(field)) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const headerLine = headers.map(escapeCsvField).join(',');
  const dataLines = rows.map((row) => row.map(escapeCsvField).join(','));

  const csv = [headerLine, ...dataLines].join('\n');

  return includeBOM ? `\uFEFF${csv}` : csv;
}

/**
 * Trigger a CSV file download in the browser.
 *
 * @example
 * downloadCsv({
 *   headers: ['Invoice #', 'Amount'],
 *   rows: [['INV-001', '$1,000.00']],
 *   filename: 'invoices-export',
 * })
 */
export function downloadCsv(options: CsvExportOptions): void {
  const csvContent = toCsv(options);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, `${options.filename}.csv`);
}

// ---------------------------------------------------------------------------
// PDF Export (client-side generation placeholder)
// ---------------------------------------------------------------------------

export interface PdfExportOptions {
  /** HTML content to convert to PDF */
  content: string;
  /** File name (without extension) */
  filename: string;
  /** Paper size */
  paperSize?: 'A4' | 'Letter' | 'Legal';
  /** Orientation */
  orientation?: 'portrait' | 'landscape';
  /** Margins in mm */
  margins?: { top: number; right: number; bottom: number; left: number };
}

/**
 * Generate a PDF from HTML content using the browser's print API.
 * For production use, integrate with a library like jsPDF or html2pdf.
 *
 * @example
 * generatePdf({
 *   content: '<div>Invoice content</div>',
 *   filename: 'invoice-INV-001',
 * })
 */
export async function generatePdf(options: PdfExportOptions): Promise<void> {
  const {
    content,
    filename,
    paperSize = 'A4',
    orientation = 'portrait',
    margins = { top: 10, right: 10, bottom: 10, left: 10 },
  } = options;

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Unable to open print window. Please allow popups.');
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${filename}</title>
      <style>
        @page {
          size: ${paperSize} ${orientation};
          margin: ${margins.top}mm ${margins.right}mm ${margins.bottom}mm ${margins.left}mm;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      </style>
    </head>
    <body>${content}</body>
    </html>
  `);

  printWindow.document.close();

  // Wait for content to load, then print
  return new Promise((resolve) => {
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        resolve();
      }, 250);
    };
  });
}

// ---------------------------------------------------------------------------
// JSON Export
// ---------------------------------------------------------------------------

export interface JsonExportOptions {
  /** Data to export */
  data: unknown;
  /** File name (without extension) */
  filename: string;
  /** Pretty-print the JSON */
  pretty?: boolean;
}

/**
 * Trigger a JSON file download in the browser.
 */
export function downloadJson(options: JsonExportOptions): void {
  const { data, filename, pretty = true } = options;
  const jsonContent = JSON.stringify(data, null, pretty ? 2 : 0);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  triggerDownload(blob, `${filename}.json`);
}

// ---------------------------------------------------------------------------
// Excel-compatible CSV (TSV)
// ---------------------------------------------------------------------------

export interface TsvExportOptions {
  headers: string[];
  rows: string[][];
  filename: string;
}

/**
 * Export as tab-separated values (better for some Excel locales).
 */
export function downloadTsv(options: TsvExportOptions): void {
  const { headers, rows, filename } = options;
  const headerLine = headers.join('\t');
  const dataLines = rows.map((row) => row.join('\t'));
  const tsv = [headerLine, ...dataLines].join('\n');

  const blob = new Blob([`\uFEFF${tsv}`], { type: 'text/tab-separated-values;charset=utf-8;' });
  triggerDownload(blob, `${filename}.tsv`);
}

// ---------------------------------------------------------------------------
// Generic Download Helper
// ---------------------------------------------------------------------------

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

// ---------------------------------------------------------------------------
// Date-stamped filename helper
// ---------------------------------------------------------------------------

/**
 * Append a date stamp to a filename.
 *
 * @example
 * withDateStamp('invoices-export')  // "invoices-export-2024-01-15"
 */
export function withDateStamp(filename: string, date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${filename}-${y}-${m}-${d}`;
}
