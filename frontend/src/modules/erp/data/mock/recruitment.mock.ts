export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary: string;
  status: 'open' | 'on-hold' | 'closed' | 'filled';
  postedDate: string;
  applicants: number;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobId: string;
  stage: 'applied' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  rating: number;
  resumeUrl: string;
}

export interface Referral {
  id: string;
  referredBy: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  status: 'pending' | 'reviewed' | 'hired' | 'rejected' | 'bonus-paid';
  bonusAmount: number;
  bonusStatus: 'unpaid' | 'pending' | 'paid';
}

export const jobOpenings: JobOpening[] = [
  {
    id: 'JOB001',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    experience: '5-7 years',
    salary: '$130,000 - $160,000',
    status: 'open',
    postedDate: '2025-01-15',
    applicants: 24,
    description: 'We are looking for a Senior Frontend Developer to lead our web application development using React and Next.js. The ideal candidate has experience with design systems, performance optimization, and mentoring junior developers.',
  },
  {
    id: 'JOB002',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'full-time',
    experience: '2-4 years',
    salary: '$70,000 - $90,000',
    status: 'open',
    postedDate: '2025-02-01',
    applicants: 18,
    description: 'Join our marketing team to drive brand awareness and lead generation campaigns. Experience with digital marketing, SEO, and analytics platforms required.',
  },
  {
    id: 'JOB003',
    title: 'Data Analyst',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'full-time',
    experience: '3-5 years',
    salary: '$95,000 - $120,000',
    status: 'on-hold',
    postedDate: '2025-01-20',
    applicants: 12,
    description: 'Seeking a Data Analyst to transform raw data into actionable business insights. Proficiency in SQL, Python, and data visualization tools required.',
  },
  {
    id: 'JOB004',
    title: 'Account Executive',
    department: 'Sales',
    location: 'Chicago, IL',
    type: 'full-time',
    experience: '3-5 years',
    salary: '$80,000 - $110,000 + Commission',
    status: 'open',
    postedDate: '2025-02-10',
    applicants: 9,
    description: 'Drive revenue growth by managing enterprise client relationships and closing new business. SaaS sales experience preferred.',
  },
  {
    id: 'JOB005',
    title: 'UX Designer',
    department: 'Engineering',
    location: 'Remote',
    type: 'contract',
    experience: '4-6 years',
    salary: '$90,000 - $115,000',
    status: 'open',
    postedDate: '2025-02-15',
    applicants: 15,
    description: 'Design intuitive and beautiful user experiences for our suite of enterprise products. Must have a strong portfolio demonstrating user-centered design principles.',
  },
  {
    id: 'JOB006',
    title: 'Financial Controller',
    department: 'Finance',
    location: 'New York, NY',
    type: 'full-time',
    experience: '8-10 years',
    salary: '$150,000 - $180,000',
    status: 'filled',
    postedDate: '2024-11-01',
    applicants: 6,
    description: 'Oversee all financial operations including reporting, compliance, and strategic planning. CPA certification required.',
  },
  {
    id: 'JOB007',
    title: 'DevOps Intern',
    department: 'Engineering',
    location: 'Remote',
    type: 'internship',
    experience: '0-1 year',
    salary: '$30/hr',
    status: 'open',
    postedDate: '2025-02-20',
    applicants: 31,
    description: 'Summer internship opportunity for students interested in cloud infrastructure, CI/CD pipelines, and automation. Currently pursuing a CS or related degree.',
  },
  {
    id: 'JOB008',
    title: 'HR Business Partner',
    department: 'HR',
    location: 'Austin, TX',
    type: 'full-time',
    experience: '5-8 years',
    salary: '$100,000 - $130,000',
    status: 'closed',
    postedDate: '2024-10-15',
    applicants: 11,
    description: 'Partner with business leaders to develop and execute people strategies. Experience with organizational development and change management required.',
  },
];

export const candidates: Candidate[] = [
  {
    id: 'CAN001',
    name: 'Alex Rivera',
    email: 'alex.rivera@gmail.com',
    phone: '+1 (555) 201-3001',
    jobId: 'JOB001',
    stage: 'technical',
    appliedDate: '2025-01-18',
    rating: 4,
    resumeUrl: '/resumes/can001.pdf',
  },
  {
    id: 'CAN002',
    name: 'Jordan Park',
    email: 'jordan.park@outlook.com',
    phone: '+1 (555) 201-3002',
    jobId: 'JOB001',
    stage: 'interview',
    appliedDate: '2025-01-20',
    rating: 3,
    resumeUrl: '/resumes/can002.pdf',
  },
  {
    id: 'CAN003',
    name: 'Samira Okonkwo',
    email: 'samira.okonkwo@gmail.com',
    phone: '+1 (555) 201-3003',
    jobId: 'JOB001',
    stage: 'screening',
    appliedDate: '2025-01-25',
    rating: 0,
    resumeUrl: '/resumes/can003.pdf',
  },
  {
    id: 'CAN004',
    name: 'Liam O\'Connor',
    email: 'liam.oconnor@yahoo.com',
    phone: '+1 (555) 201-3004',
    jobId: 'JOB001',
    stage: 'rejected',
    appliedDate: '2025-01-19',
    rating: 2,
    resumeUrl: '/resumes/can004.pdf',
  },
  {
    id: 'CAN005',
    name: 'Nina Petrova',
    email: 'nina.petrova@gmail.com',
    phone: '+1 (555) 201-3005',
    jobId: 'JOB002',
    stage: 'offer',
    appliedDate: '2025-02-03',
    rating: 5,
    resumeUrl: '/resumes/can005.pdf',
  },
  {
    id: 'CAN006',
    name: 'Derek Washington',
    email: 'derek.washington@gmail.com',
    phone: '+1 (555) 201-3006',
    jobId: 'JOB002',
    stage: 'interview',
    appliedDate: '2025-02-08',
    rating: 4,
    resumeUrl: '/resumes/can006.pdf',
  },
  {
    id: 'CAN007',
    name: 'Chloe Bennett',
    email: 'chloe.bennett@outlook.com',
    phone: '+1 (555) 201-3007',
    jobId: 'JOB003',
    stage: 'applied',
    appliedDate: '2025-01-22',
    rating: 0,
    resumeUrl: '/resumes/can007.pdf',
  },
  {
    id: 'CAN008',
    name: 'Ravi Sharma',
    email: 'ravi.sharma@gmail.com',
    phone: '+1 (555) 201-3008',
    jobId: 'JOB003',
    stage: 'screening',
    appliedDate: '2025-01-24',
    rating: 3,
    resumeUrl: '/resumes/can008.pdf',
  },
  {
    id: 'CAN009',
    name: 'Amanda Foster',
    email: 'amanda.foster@gmail.com',
    phone: '+1 (555) 201-3009',
    jobId: 'JOB004',
    stage: 'technical',
    appliedDate: '2025-02-12',
    rating: 4,
    resumeUrl: '/resumes/can009.pdf',
  },
  {
    id: 'CAN010',
    name: 'Marcus Lee',
    email: 'marcus.lee@outlook.com',
    phone: '+1 (555) 201-3010',
    jobId: 'JOB004',
    stage: 'applied',
    appliedDate: '2025-02-15',
    rating: 0,
    resumeUrl: '/resumes/can010.pdf',
  },
  {
    id: 'CAN011',
    name: 'Zara Hussain',
    email: 'zara.hussain@gmail.com',
    phone: '+1 (555) 201-3011',
    jobId: 'JOB005',
    stage: 'interview',
    appliedDate: '2025-02-18',
    rating: 4,
    resumeUrl: '/resumes/can011.pdf',
  },
  {
    id: 'CAN012',
    name: 'Tomás García',
    email: 'tomas.garcia@gmail.com',
    phone: '+1 (555) 201-3012',
    jobId: 'JOB005',
    stage: 'screening',
    appliedDate: '2025-02-20',
    rating: 3,
    resumeUrl: '/resumes/can012.pdf',
  },
  {
    id: 'CAN013',
    name: 'Emily Nakamura',
    email: 'emily.nakamura@gmail.com',
    phone: '+1 (555) 201-3013',
    jobId: 'JOB006',
    stage: 'hired',
    appliedDate: '2024-11-05',
    rating: 5,
    resumeUrl: '/resumes/can013.pdf',
  },
  {
    id: 'CAN014',
    name: 'Kwame Asante',
    email: 'kwame.asante@gmail.com',
    phone: '+1 (555) 201-3014',
    jobId: 'JOB007',
    stage: 'screening',
    appliedDate: '2025-02-22',
    rating: 3,
    resumeUrl: '/resumes/can014.pdf',
  },
  {
    id: 'CAN015',
    name: 'Isabelle Dupont',
    email: 'isabelle.dupont@gmail.com',
    phone: '+1 (555) 201-3015',
    jobId: 'JOB007',
    stage: 'applied',
    appliedDate: '2025-02-25',
    rating: 0,
    resumeUrl: '/resumes/can015.pdf',
  },
];

export const referrals: Referral[] = [
  {
    id: 'REF001',
    referredBy: 'EMP001',
    candidateName: 'Alex Rivera',
    candidateEmail: 'alex.rivera@gmail.com',
    jobId: 'JOB001',
    status: 'reviewed',
    bonusAmount: 3000,
    bonusStatus: 'unpaid',
  },
  {
    id: 'REF002',
    referredBy: 'EMP004',
    candidateName: 'Amanda Foster',
    candidateEmail: 'amanda.foster@gmail.com',
    jobId: 'JOB004',
    status: 'pending',
    bonusAmount: 2500,
    bonusStatus: 'unpaid',
  },
  {
    id: 'REF003',
    referredBy: 'EMP003',
    candidateName: 'Nina Petrova',
    candidateEmail: 'nina.petrova@gmail.com',
    jobId: 'JOB002',
    status: 'hired',
    bonusAmount: 3000,
    bonusStatus: 'paid',
  },
  {
    id: 'REF004',
    referredBy: 'EMP025',
    candidateName: 'Jordan Park',
    candidateEmail: 'jordan.park@outlook.com',
    jobId: 'JOB001',
    status: 'reviewed',
    bonusAmount: 3000,
    bonusStatus: 'unpaid',
  },
  {
    id: 'REF005',
    referredBy: 'EMP017',
    candidateName: 'Ravi Sharma',
    candidateEmail: 'ravi.sharma@gmail.com',
    jobId: 'JOB003',
    status: 'rejected',
    bonusAmount: 2500,
    bonusStatus: 'unpaid',
  },
];

export function getJobOpeningById(id: string): JobOpening | undefined {
  return jobOpenings.find((j) => j.id === id);
}

export function getCandidatesByJobOpening(jobId: string): Candidate[] {
  return candidates.filter((c) => c.jobId === jobId);
}

export function getCandidateById(id: string): Candidate | undefined {
  return candidates.find((c) => c.id === id);
}

export function getReferralById(id: string): Referral | undefined {
  return referrals.find((r) => r.id === id);
}
