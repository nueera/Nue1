export const onboardingTemplates = [
  { id: 'OT001', name: 'Engineering Onboarding', department: 'Engineering', tasks: [] },
  { id: 'OT002', name: 'General Onboarding', department: 'All', tasks: [] },
];

export const newHires = [
  { id: 'NH001', employeeId: 'EMP021', templateId: 'OT001', startDate: '2025-03-15', stage: 'week-one' as const, tasks: [], completionPct: 60, buddy: 'EMP001', manager: 'EMP025' },
];
