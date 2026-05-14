// @ts-nocheck
// ============================================================================
// Scoring Utils — Calculate lead scores, categories, colors, trends
// ============================================================================

import type { LeadScore, ScoringCriteria } from '../types';

type ScoreCategory = 'hot' | 'warm' | 'cold' | 'inactive';

const SCORE_CATEGORY_THRESHOLDS: Record<ScoreCategory, { min: number; max: number }> = {
  hot: { min: 75, max: 100 },
  warm: { min: 40, max: 74 },
  cold: { min: 1, max: 39 },
  inactive: { min: 0, max: 0 },
};

const SCORE_COLORS: Record<ScoreCategory, string> = {
  hot: 'text-red-600',
  warm: 'text-amber-600',
  cold: 'text-blue-600',
  inactive: 'text-gray-400',
};

const SCORE_BG_COLORS: Record<ScoreCategory, string> = {
  hot: 'bg-red-100',
  warm: 'bg-amber-100',
  cold: 'bg-blue-100',
  inactive: 'bg-gray-100',
};

export function calculateLeadScore(
  criteria: Array<{ criteria: ScoringCriteria; weight: number; value: number }>,
  maxScore: number = 100
): number {
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  if (totalWeight === 0) return 0;

  const weightedSum = criteria.reduce((sum, c) => sum + c.value * c.weight, 0);
  const normalizedScore = (weightedSum / totalWeight) * (100 / maxScore);

  return Math.round(Math.min(100, Math.max(0, normalizedScore)));
}

export function getScoreCategory(score: number): ScoreCategory {
  if (score === 0) return 'inactive';
  if (score >= SCORE_CATEGORY_THRESHOLDS.hot.min) return 'hot';
  if (score >= SCORE_CATEGORY_THRESHOLDS.warm.min) return 'warm';
  return 'cold';
}

export function getScoreColor(score: number): string {
  return SCORE_COLORS[getScoreCategory(score)];
}

export function getScoreBgColor(score: number): string {
  return SCORE_BG_COLORS[getScoreCategory(score)];
}

export function getScoreTrend(currentScore: LeadScore, previousScore?: LeadScore): 'up' | 'down' | 'stable' {
  if (!previousScore) return 'stable';
  const diff = currentScore.total - previousScore.total;
  if (diff > 2) return 'up';
  if (diff < -2) return 'down';
  return 'stable';
}

export function getScoreCategoryLabel(category: ScoreCategory): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
