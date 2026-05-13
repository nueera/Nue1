export function calcAvgRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
}

export function getRatingColor(rating: number): string {
  if (rating >= 4) return 'text-green-500';
  if (rating >= 3) return 'text-amber-500';
  return 'text-red-500';
}

export function getGoalCompletionPct(progress: number): number {
  return Math.min(100, Math.max(0, progress));
}
