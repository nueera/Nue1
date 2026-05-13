export const reviewCycles = [
  { id: 'RC001', name: 'Q1 2025 Review', startDate: '2025-01-01', endDate: '2025-03-31', status: 'completed' as const, reviewers: ['EMP025'] },
  { id: 'RC002', name: 'Q2 2025 Review', startDate: '2025-04-01', endDate: '2025-06-30', status: 'in-progress' as const, reviewers: ['EMP025'] },
];

export const goals = [
  { id: 'G001', employeeId: 'EMP001', cycleId: 'RC002', title: 'Complete frontend migration', description: 'Migrate all pages to Next.js App Router', targetDate: '2025-06-30', progress: 65, status: 'in-progress' as const },
  { id: 'G002', employeeId: 'EMP001', cycleId: 'RC002', title: 'Improve test coverage', description: 'Achieve 80% test coverage', targetDate: '2025-06-30', progress: 40, status: 'in-progress' as const },
];
