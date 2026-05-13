import type { APIEndpoint } from "./types";

export function getAPIEndpointLabel(item: APIEndpoint): string { return item.name || item.id; }