import type { Team } from "./types";

export function getTeamLabel(item: Team): string { return item.name || item.id; }