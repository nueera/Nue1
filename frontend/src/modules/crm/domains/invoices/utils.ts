import type { Invoice } from "./types";

export function getInvoiceLabel(item: Invoice): string { return item.invoiceNumber || item.id; }