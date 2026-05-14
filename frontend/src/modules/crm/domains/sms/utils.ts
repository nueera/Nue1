// @ts-nocheck
import type { SMSMessage } from "./types";

export function getSMSMessageLabel(item: SMSMessage): string { return item.name || item.id; }