import type { SMSMessage } from "./types";

export function getSMSMessageLabel(item: SMSMessage): string { return item.body?.substring(0, 50) || item.id; }