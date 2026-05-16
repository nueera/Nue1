import type { APIEndpoint } from "./types";

export function getAPIEndpointLabel(item: APIEndpoint): string { return item.path || item.id; }