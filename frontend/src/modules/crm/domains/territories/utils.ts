// @ts-nocheck
import type { Territory } from "./types";

export function getTerritoryLabel(item: Territory): string { return item.name || item.id; }