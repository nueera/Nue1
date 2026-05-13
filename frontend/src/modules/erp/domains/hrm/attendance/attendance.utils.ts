export function calcWorkHours(checkIn: string, checkOut: string): number {
  if (checkIn === '-' || checkOut === '-') return 0;
  const [h1, m1] = checkIn.split(':').map(Number);
  const [h2, m2] = checkOut.split(':').map(Number);
  return (h2 * 60 + m2 - (h1 * 60 + m1)) / 60;
}

export function calcOvertime(workHours: number, standardHours: number = 8): number {
  return Math.max(0, workHours - standardHours);
}

export function isLate(checkIn: string, shiftStart: string = '09:00', graceMinutes: number = 15): boolean {
  const [ch, cm] = checkIn.split(':').map(Number);
  const [sh, sm] = shiftStart.split(':').map(Number);
  const checkInMinutes = ch * 60 + cm;
  const shiftStartMinutes = sh * 60 + sm + graceMinutes;
  return checkInMinutes > shiftStartMinutes;
}

export function fmtDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}
