import { APPLICATION_STAGE_LABELS, JOB_OPENING_STATUS_LABELS } from './constants';

/**
 * Get a color class for a recruitment stage based on its name.
 */
export function getStageColor(stage: string): string {
  const stageColors: Record<string, string> = {
    applied: 'bg-blue-500/10 text-blue-500 border-blue-500/15',
    screening: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/15',
    'phone-screen': 'bg-teal-500/10 text-teal-500 border-teal-500/15',
    technical: 'bg-amber-500/10 text-amber-500 border-amber-500/15',
    managerial: 'bg-orange-500/10 text-orange-500 border-orange-500/15',
    'hr-round': 'bg-purple-500/10 text-purple-500 border-purple-500/15',
    offer: 'bg-green-500/10 text-green-500 border-green-500/15',
    hired: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/15',
    rejected: 'bg-red-500/10 text-red-500 border-red-500/15',
  };
  return stageColors[stage] || 'bg-zinc-500/10 text-zinc-500 border-zinc-500/15';
}

/**
 * Calculate the time-to-hire metric in days.
 * Time-to-hire = number of days from application to hiring.
 */
export function calcTimeToHire(appliedAt: string, hiredAt: string): number {
  const applied = new Date(appliedAt);
  const hired = new Date(hiredAt);
  const diff = hired.getTime() - applied.getTime();
  return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

/**
 * Calculate a fit score for a candidate based on skill matching.
 * Returns a number between 0 and 100.
 */
export function getFitScore(
  candidateSkills: string[],
  requiredSkills: string[],
  preferredSkills: string[] = [],
): number {
  if (requiredSkills.length === 0 && preferredSkills.length === 0) return 50;

  const normalizedCandidateSkills = candidateSkills.map((s) => s.toLowerCase().trim());
  const normalizedRequired = requiredSkills.map((s) => s.toLowerCase().trim());
  const normalizedPreferred = preferredSkills.map((s) => s.toLowerCase().trim());

  const requiredMatch = normalizedRequired.filter((skill) =>
    normalizedCandidateSkills.some((cs) => cs.includes(skill) || skill.includes(cs)),
  ).length;

  const preferredMatch = normalizedPreferred.filter((skill) =>
    normalizedCandidateSkills.some((cs) => cs.includes(skill) || skill.includes(cs)),
  ).length;

  const requiredWeight = 0.7;
  const preferredWeight = 0.3;

  const totalRequiredScore = normalizedRequired.length > 0
    ? (requiredMatch / normalizedRequired.length) * requiredWeight
    : preferredWeight;

  const totalPreferredScore = normalizedPreferred.length > 0
    ? (preferredMatch / normalizedPreferred.length) * preferredWeight
    : requiredWeight;

  const rawScore = normalizedRequired.length > 0 && normalizedPreferred.length > 0
    ? totalRequiredScore + totalPreferredScore
    : totalRequiredScore + totalPreferredScore;

  return Math.min(100, Math.round(rawScore * 100));
}

/**
 * Get the human-readable label for a recruitment stage.
 */
export function getStageLabel(stage: string): string {
  return APPLICATION_STAGE_LABELS[stage] || stage;
}

/**
 * Get the human-readable label for a job opening status.
 */
export function getOpeningStatusLabel(status: string): string {
  return JOB_OPENING_STATUS_LABELS[status] || status;
}
