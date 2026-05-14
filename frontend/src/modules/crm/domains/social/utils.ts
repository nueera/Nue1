// @ts-nocheck
import type { SocialProfile } from "./types";

export function getSocialProfileLabel(item: SocialProfile): string { return item.name || item.id; }