// @ts-nocheck
import type { SalesOrder } from "./types";

export function getSalesOrderLabel(item: SalesOrder): string { return item.name || item.id; }