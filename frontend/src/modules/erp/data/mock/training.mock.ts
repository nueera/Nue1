export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  trainer: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  enrolledCount: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  location: string;
}

export interface TrainingEnrollment {
  id: string;
  programId: string;
  employeeId: string;
  employeeName: string;
  status: 'enrolled' | 'in-progress' | 'completed' | 'dropped' | 'waitlisted';
  enrolledDate: string;
  completedDate: string | null;
  progress: number;
}

export interface TrainingFeedback {
  id: string;
  programId: string;
  employeeId: string;
  employeeName: string;
  rating: number;
  comments: string;
  submittedAt: string;
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: 'TRN001',
    title: 'React & Next.js Advanced Patterns',
    description: 'Deep dive into advanced React patterns including server components, suspense boundaries, and Next.js App Router optimization techniques.',
    category: 'Technical',
    duration: '5 days',
    trainer: 'Michael O\'Brien',
    startDate: '2025-03-10',
    endDate: '2025-03-14',
    maxParticipants: 20,
    enrolledCount: 16,
    status: 'upcoming',
    location: 'Conference Room A / Virtual',
  },
  {
    id: 'TRN002',
    title: 'Leadership Essentials',
    description: 'Develop core leadership skills including delegation, conflict resolution, and strategic thinking. Designed for new and aspiring managers.',
    category: 'Leadership',
    duration: '3 days',
    trainer: 'External Facilitator - Dr. Karen White',
    startDate: '2025-02-17',
    endDate: '2025-02-19',
    maxParticipants: 15,
    enrolledCount: 14,
    status: 'in-progress',
    location: 'Training Center - 5th Floor',
  },
  {
    id: 'TRN003',
    title: 'AWS Cloud Practitioner Certification Prep',
    description: 'Comprehensive preparation course for the AWS Cloud Practitioner certification exam covering cloud concepts, security, and billing.',
    category: 'Technical',
    duration: '4 weeks',
    trainer: 'Raj Krishnan',
    startDate: '2025-01-06',
    endDate: '2025-01-31',
    maxParticipants: 25,
    enrolledCount: 22,
    status: 'completed',
    location: 'Virtual',
  },
  {
    id: 'TRN004',
    title: 'Effective Communication & Presentation',
    description: 'Master the art of clear communication and persuasive presentations. Includes video recording and peer feedback sessions.',
    category: 'Soft Skills',
    duration: '2 days',
    trainer: 'External Facilitator - Patricia Moore',
    startDate: '2025-03-24',
    endDate: '2025-03-25',
    maxParticipants: 12,
    enrolledCount: 8,
    status: 'upcoming',
    location: 'Board Room',
  },
  {
    id: 'TRN005',
    title: 'Financial Modeling & Analysis',
    description: 'Hands-on training in building financial models, forecasting, and data analysis using Excel and Google Sheets.',
    category: 'Finance',
    duration: '3 days',
    trainer: 'Andrew Thompson',
    startDate: '2025-04-07',
    endDate: '2025-04-09',
    maxParticipants: 10,
    enrolledCount: 7,
    status: 'upcoming',
    location: 'Finance Department - Room 301',
  },
  {
    id: 'TRN006',
    title: 'Agile Project Management',
    description: 'Learn Agile and Scrum methodologies with hands-on simulations. Prepares participants for Professional Scrum Master certification.',
    category: 'Project Management',
    duration: '2 days',
    trainer: 'Grace Lee',
    startDate: '2025-01-20',
    endDate: '2025-01-21',
    maxParticipants: 18,
    enrolledCount: 18,
    status: 'completed',
    location: 'Training Center - 5th Floor',
  },
  {
    id: 'TRN007',
    title: 'Cybersecurity Awareness',
    description: 'Mandatory annual cybersecurity awareness training covering phishing, social engineering, data protection, and best practices.',
    category: 'Compliance',
    duration: '4 hours',
    trainer: 'Tyler Brooks',
    startDate: '2025-02-05',
    endDate: '2025-02-05',
    maxParticipants: 50,
    enrolledCount: 45,
    status: 'completed',
    location: 'Virtual',
  },
  {
    id: 'TRN008',
    title: 'Sales Methodology & CRM Mastery',
    description: 'Learn our proven sales methodology and master the CRM platform for pipeline management and forecasting.',
    category: 'Sales',
    duration: '3 days',
    trainer: 'James Wilson',
    startDate: '2025-04-14',
    endDate: '2025-04-16',
    maxParticipants: 15,
    enrolledCount: 6,
    status: 'upcoming',
    location: 'Sales Floor - Room 102',
  },
];

export const trainingEnrollments: TrainingEnrollment[] = [
  {
    id: 'ENR001',
    programId: 'TRN001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Chen',
    status: 'enrolled',
    enrolledDate: '2025-02-20',
    completedDate: null,
    progress: 0,
  },
  {
    id: 'ENR002',
    programId: 'TRN001',
    employeeId: 'EMP002',
    employeeName: 'Marcus Johnson',
    status: 'enrolled',
    enrolledDate: '2025-02-18',
    completedDate: null,
    progress: 0,
  },
  {
    id: 'ENR003',
    programId: 'TRN002',
    employeeId: 'EMP023',
    employeeName: 'Carlos Mendez',
    status: 'in-progress',
    enrolledDate: '2025-02-10',
    completedDate: null,
    progress: 45,
  },
  {
    id: 'ENR004',
    programId: 'TRN002',
    employeeId: 'EMP016',
    employeeName: 'Olivia Brown',
    status: 'in-progress',
    enrolledDate: '2025-02-12',
    completedDate: null,
    progress: 45,
  },
  {
    id: 'ENR005',
    programId: 'TRN003',
    employeeId: 'EMP009',
    employeeName: 'Mei Zhang',
    status: 'completed',
    enrolledDate: '2024-12-15',
    completedDate: '2025-01-31',
    progress: 100,
  },
  {
    id: 'ENR006',
    programId: 'TRN003',
    employeeId: 'EMP008',
    employeeName: 'Tyler Brooks',
    status: 'completed',
    enrolledDate: '2024-12-18',
    completedDate: '2025-01-31',
    progress: 100,
  },
  {
    id: 'ENR007',
    programId: 'TRN004',
    employeeId: 'EMP011',
    employeeName: 'Fatima Al-Hassan',
    status: 'enrolled',
    enrolledDate: '2025-03-01',
    completedDate: null,
    progress: 0,
  },
  {
    id: 'ENR008',
    programId: 'TRN004',
    employeeId: 'EMP013',
    employeeName: 'Sofia Martinez',
    status: 'enrolled',
    enrolledDate: '2025-03-03',
    completedDate: null,
    progress: 0,
  },
  {
    id: 'ENR009',
    programId: 'TRN005',
    employeeId: 'EMP006',
    employeeName: 'David Kim',
    status: 'enrolled',
    enrolledDate: '2025-03-10',
    completedDate: null,
    progress: 0,
  },
  {
    id: 'ENR010',
    programId: 'TRN005',
    employeeId: 'EMP012',
    employeeName: 'Lucas Anderson',
    status: 'enrolled',
    enrolledDate: '2025-03-08',
    completedDate: null,
    progress: 0,
  },
  {
    id: 'ENR011',
    programId: 'TRN006',
    employeeId: 'EMP020',
    employeeName: 'Grace Lee',
    status: 'completed',
    enrolledDate: '2025-01-10',
    completedDate: '2025-01-21',
    progress: 100,
  },
  {
    id: 'ENR012',
    programId: 'TRN006',
    employeeId: 'EMP014',
    employeeName: 'Nathan Clark',
    status: 'completed',
    enrolledDate: '2025-01-12',
    completedDate: '2025-01-21',
    progress: 100,
  },
  {
    id: 'ENR013',
    programId: 'TRN007',
    employeeId: 'EMP001',
    employeeName: 'Sarah Chen',
    status: 'completed',
    enrolledDate: '2025-01-28',
    completedDate: '2025-02-05',
    progress: 100,
  },
  {
    id: 'ENR014',
    programId: 'TRN007',
    employeeId: 'EMP003',
    employeeName: 'Priya Patel',
    status: 'completed',
    enrolledDate: '2025-01-29',
    completedDate: '2025-02-05',
    progress: 100,
  },
  {
    id: 'ENR015',
    programId: 'TRN008',
    employeeId: 'EMP016',
    employeeName: 'Olivia Brown',
    status: 'enrolled',
    enrolledDate: '2025-03-15',
    completedDate: null,
    progress: 0,
  },
];

export const trainingFeedbacks: TrainingFeedback[] = [
  {
    id: 'FB001',
    programId: 'TRN003',
    employeeId: 'EMP009',
    employeeName: 'Mei Zhang',
    rating: 5,
    comments: 'Excellent course! The hands-on labs were particularly helpful. I passed my AWS certification on the first attempt.',
    submittedAt: '2025-02-01',
  },
  {
    id: 'FB002',
    programId: 'TRN003',
    employeeId: 'EMP008',
    employeeName: 'Tyler Brooks',
    rating: 4,
    comments: 'Great content and well-structured. Would have liked more time on security modules. Overall very useful.',
    submittedAt: '2025-02-02',
  },
  {
    id: 'FB003',
    programId: 'TRN006',
    employeeId: 'EMP020',
    employeeName: 'Grace Lee',
    rating: 5,
    comments: 'As the trainer, I was impressed with participant engagement. The simulations really drove home the Agile principles.',
    submittedAt: '2025-01-22',
  },
  {
    id: 'FB004',
    programId: 'TRN006',
    employeeId: 'EMP014',
    employeeName: 'Nathan Clark',
    rating: 4,
    comments: 'Practical and immediately applicable. The Scrum simulation was the highlight. Helped me understand sprint planning much better.',
    submittedAt: '2025-01-23',
  },
  {
    id: 'FB005',
    programId: 'TRN007',
    employeeId: 'EMP001',
    employeeName: 'Sarah Chen',
    rating: 3,
    comments: 'Good refresher on cybersecurity basics. Some content felt repetitive from last year. The phishing simulation was eye-opening.',
    submittedAt: '2025-02-06',
  },
  {
    id: 'FB006',
    programId: 'TRN007',
    employeeId: 'EMP003',
    employeeName: 'Priya Patel',
    rating: 4,
    comments: 'Very informative. The real-world examples of social engineering attacks were particularly valuable. Mandatory but worthwhile.',
    submittedAt: '2025-02-06',
  },
  {
    id: 'FB007',
    programId: 'TRN003',
    employeeId: 'EMP017',
    employeeName: 'Raj Krishnan',
    rating: 4,
    comments: 'Solid preparation material. The practice exams closely matched the actual test format. Highly recommend for anyone pursuing AWS certification.',
    submittedAt: '2025-02-03',
  },
  {
    id: 'FB008',
    programId: 'TRN006',
    employeeId: 'EMP014',
    employeeName: 'Nathan Clark',
    rating: 5,
    comments: 'Best training I\'ve attended this year. Grace is an excellent instructor who makes complex concepts easy to understand.',
    submittedAt: '2025-01-24',
  },
  {
    id: 'FB009',
    programId: 'TRN003',
    employeeId: 'EMP021',
    employeeName: 'Hassan Ali',
    rating: 5,
    comments: 'Comprehensive and well-paced. The cloud architecture design exercise was my favorite part. Feel confident about the exam now.',
    submittedAt: '2025-02-04',
  },
  {
    id: 'FB010',
    programId: 'TRN007',
    employeeId: 'EMP012',
    employeeName: 'Lucas Anderson',
    rating: 3,
    comments: 'Good overview of current threats. Would like to see more content on data privacy regulations and compliance requirements.',
    submittedAt: '2025-02-07',
  },
];

export function getTrainingProgramById(id: string): TrainingProgram | undefined {
  return trainingPrograms.find((p) => p.id === id);
}

export function getEnrollmentsByProgramId(programId: string): TrainingEnrollment[] {
  return trainingEnrollments.filter((e) => e.programId === programId);
}

export function getEnrollmentsByEmployeeId(employeeId: string): TrainingEnrollment[] {
  return trainingEnrollments.filter((e) => e.employeeId === employeeId);
}

export function getFeedbackByProgramId(programId: string): TrainingFeedback[] {
  return trainingFeedbacks.filter((f) => f.programId === programId);
}
