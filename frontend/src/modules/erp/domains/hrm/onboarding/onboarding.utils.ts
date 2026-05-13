export function calcCompletionPct(tasks: Array<{ completed: boolean }>): number {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter((t) => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
}

export function getDaysSinceJoin(joinDate: string): number {
  const start = new Date(joinDate);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
}

export function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}
