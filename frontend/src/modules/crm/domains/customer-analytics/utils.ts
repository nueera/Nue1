import type { CustomerSegment } from "./types";

export function getCustomerSegmentLabel(item: CustomerSegment): string { return item.name || item.id; }