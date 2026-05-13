import type { Journey } from "./types";

export function getJourneyLabel(item: Journey): string { return item.name || item.id; }