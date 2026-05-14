// @ts-nocheck
import type { ForecastPeriod } from "./types";

export function getForecastPeriodLabel(item: ForecastPeriod): string { return item.name || item.id; }