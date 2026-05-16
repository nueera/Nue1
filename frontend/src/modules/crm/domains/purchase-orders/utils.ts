import type { PurchaseOrder } from "./types";

export function getPurchaseOrderLabel(item: PurchaseOrder): string { return item.subject || item.id; }