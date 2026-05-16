import type { SalesOrder } from "./types";

export function getSalesOrderLabel(item: SalesOrder): string { return item.subject || item.id; }