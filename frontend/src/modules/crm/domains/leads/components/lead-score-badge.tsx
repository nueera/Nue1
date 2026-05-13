'use client';

import { getLeadScoreColor, computeLeadGrade } from '../utils';

interface LeadScoreBadgeProps {
  score: number;
}

export function LeadScoreBadge({ score }: LeadScoreBadgeProps) {
  const grade = computeLeadGrade(score);
  const color = getLeadScoreColor(score);

  return (
    <div className="flex items-center gap-2">
      <span className={`text-lg font-bold ${color}`}>{score}</span>
      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${color} bg-glass-bg`}>{grade}</span>
    </div>
  );
}
