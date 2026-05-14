// @ts-nocheck
import type { DelugeFunction } from "./types";

export function getDelugeFunctionLabel(item: DelugeFunction): string { return item.name || item.id; }