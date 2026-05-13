import type { Invoice } from "./types";

export function getInvoiceLabel(item: Invoice): string { return item.name || item.id; }