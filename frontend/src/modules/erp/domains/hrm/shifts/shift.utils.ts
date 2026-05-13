/**
 * Calculate the number of hours in a shift based on start and end times.
 * Handles overnight shifts (e.g., 22:00 - 06:00).
 */
export function calcShiftHours(startTime: string, endTime: string): number {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (endMinutes > startMinutes) {
    return (endMinutes - startMinutes) / 60;
  }

  // Overnight shift: add 24 hours worth of minutes
  return (24 * 60 - startMinutes + endMinutes) / 60;
}

/**
 * Determine if a shift is a night shift based on its start and end times.
 * A shift is considered a night shift if it starts at or after 20:00
 * or if the majority of its hours fall between 22:00 and 06:00.
 */
export function isNightShift(startTime: string, endTime: string): boolean {
  const [startH] = startTime.split(':').map(Number);
  const [endH] = endTime.split(':').map(Number);

  // Starts at or after 8 PM
  if (startH >= 20) return true;

  // Ends at or before 6 AM and starts after 6 PM
  if (endH <= 6 && startH >= 18) return true;

  // Starts before midnight and ends after midnight
  if (startH > endH && startH >= 22) return true;

  return false;
}

/**
 * Calculate the overlap duration (in hours) between two shift time ranges.
 * Returns 0 if there is no overlap.
 */
export function getShiftOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
): number {
  const toMinutes = (time: string): number => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const normalize = (start: number, end: number): [number, number] => {
    if (end <= start) return [start, end + 24 * 60];
    return [start, end];
  };

  const [normStartA, normEndA] = normalize(toMinutes(startA), toMinutes(endA));
  const [normStartB, normEndB] = normalize(toMinutes(startB), toMinutes(endB));

  const overlapStart = Math.max(normStartA, normStartB);
  const overlapEnd = Math.min(normEndA, normEndB);

  if (overlapEnd <= overlapStart) return 0;
  return (overlapEnd - overlapStart) / 60;
}
