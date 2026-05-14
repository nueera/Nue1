// @ts-nocheck
import type { Vendor } from "./types";

export function getVendorLabel(item: Vendor): string { return item.name || item.id; }