export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export function getYearsOfService(joinDate: string): number {
  const start = new Date(joinDate);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

export function calcAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const now = new Date();
  const diff = now.getTime() - birth.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}
