// @ts-nocheck
import type { Role } from "./types";

export function getRoleLabel(item: Role): string { return item.name || item.id; }