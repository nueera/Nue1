// @ts-nocheck
import type { Tag } from "./types";

export function getTagLabel(item: Tag): string { return item.name || item.id; }