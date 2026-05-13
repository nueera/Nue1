/**
 * Calculate the completion rate of a training program
 * based on enrolled vs completed participants.
 */
export function calcCompletionRate(enrolled: number, completed: number): number {
  if (enrolled === 0) return 0;
  return Math.round((completed / enrolled) * 100 * 100) / 100;
}

/**
 * Calculate the average feedback score from a list of ratings.
 */
export function getAvgFeedbackScore(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r, 0);
  return Math.round((sum / ratings.length) * 100) / 100;
}

/**
 * Get the expiry date of a certificate based on issue date and validity months.
 */
export function getCertExpiry(issueDate: string, validityMonths: number): string {
  const issued = new Date(issueDate);
  issued.setMonth(issued.getMonth() + validityMonths);
  return issued.toISOString().split('T')[0];
}

/**
 * Check if a certificate is expiring soon (within the given number of days).
 */
export function isCertExpiringSoon(expiryDate: string, withinDays: number = 30): boolean {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  const daysUntilExpiry = diff / (24 * 60 * 60 * 1000);
  return daysUntilExpiry > 0 && daysUntilExpiry <= withinDays;
}

/**
 * Check if a certificate has expired.
 */
export function isCertExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}

/**
 * Calculate the training hours completed by an employee
 * from a list of completed enrollments.
 */
export function calcTrainingHours(enrollments: Array<{ completed: boolean; durationHours: number }>): number {
  return enrollments
    .filter((e) => e.completed)
    .reduce((sum, e) => sum + e.durationHours, 0);
}
