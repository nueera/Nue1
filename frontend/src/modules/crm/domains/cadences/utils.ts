// @ts-nocheck
import type { Cadence } from "./types";

export function getCadenceLabel(item: Cadence): string { return item.name || item.id; }