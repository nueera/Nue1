// @ts-nocheck
import type { Report } from "./types";

export function getReportLabel(item: Report): string { return item.name || item.id; }