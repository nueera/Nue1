import type { ChatSession } from "./types";

export function getChatSessionLabel(item: ChatSession): string { return item.visitorName || item.id; }