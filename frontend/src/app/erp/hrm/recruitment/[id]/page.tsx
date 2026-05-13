'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  CalendarDays,
  Users,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Candidate {
  id: string;
  name: string;
  email: string;
  stage: string;
  appliedDate: string;
  rating: number;
  source: string;
}

const mockJobDetails: Record<string, {
  title: string;
  department: string;
  location: string;
  type: string;
  status: string;
  postedDate: string;
  applicants: number;
  description: string;
  candidates: Candidate[];
}> = {
  'jo-1': {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    status: 'open',
    postedDate: '2025-02-15',
    applicants: 24,
    description: 'We are looking for an experienced Frontend Developer with strong React and TypeScript skills to join our engineering team. The ideal candidate will have 5+ years of experience building modern web applications.',
    candidates: [
      { id: 'c-1', name: 'David Park', email: 'david@email.com', stage: 'screening', appliedDate: '2025-03-01', rating: 4, source: 'Referral' },
      { id: 'c-2', name: 'Alice Wang', email: 'alice@email.com', stage: 'interview', appliedDate: '2025-02-28', rating: 5, source: 'LinkedIn' },
      { id: 'c-3', name: 'Bob Martinez', email: 'bob@email.com', stage: 'screening', appliedDate: '2025-03-02', rating: 3, source: 'Job Board' },
      { id: 'c-4', name: 'Carol White', email: 'carol@email.com', stage: 'offer', appliedDate: '2025-02-20', rating: 5, source: 'Referral' },
      { id: 'c-5', name: 'Dan Brown', email: 'dan@email.com', stage: 'rejected', appliedDate: '2025-02-18', rating: 2, source: 'Website' },
    ],
  },
};

const stageBadgeClass: Record<string, string> = {
  screening: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  interview: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  offer: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  hired: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const candidateColumns: ColumnDef<Candidate>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ getValue }) => {
      const stage = getValue() as string;
      return (
        <Badge variant="outline" className={cn('capitalize', stageBadgeClass[stage] || '')} style={{ fontSize: 'var(--text-xs)' }}>
          {stage}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ getValue }) => {
      const rating = getValue() as number;
      return (
        <span className={cn('font-semibold', rating >= 4 ? 'text-green-500' : rating >= 3 ? 'text-amber-500' : 'text-red-500')} style={{ fontSize: 'var(--text-sm)' }}>
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </span>
      );
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
        {getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'appliedDate',
    header: 'Applied',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
];

function InfoItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-glass-hover text-muted-foreground shrink-0 mt-0.5">
        <Icon className="h-4 w-4" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
          {label}
        </p>
        <p className="text-foreground font-medium" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function RecruitmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const job = mockJobDetails[id];

  if (!job) {
    return (
      <PageTransition>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-12 text-center">
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>Job opening not found</p>
            <button
              onClick={() => router.push('/erp/hrm/recruitment')}
              className="mt-4 text-module-erp hover:underline"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              Back to Recruitment
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const stageCounts = {
    screening: job.candidates.filter(c => c.stage === 'screening').length,
    interview: job.candidates.filter(c => c.stage === 'interview').length,
    offer: job.candidates.filter(c => c.stage === 'offer').length,
    hired: job.candidates.filter(c => c.stage === 'hired').length,
  };

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => router.push('/erp/hrm/recruitment')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-[var(--motion-fast)] mb-6 press-scale"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          <span style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
            Back to Recruitment
          </span>
        </motion.button>

        {/* Job header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6 sm:p-8 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-module-erp/10 text-module-erp shrink-0">
              <Briefcase className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  className="font-bold text-foreground"
                  style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
                >
                  {job.title}
                </h1>
                <Badge
                  variant="outline"
                  className={cn('capitalize', job.status === 'open' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15' : 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15')}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {job.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
                {job.department} &middot; {job.type}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Tabs defaultValue="pipeline" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pipeline">Candidate Pipeline</TabsTrigger>
              <TabsTrigger value="details">Job Details</TabsTrigger>
            </TabsList>

            <TabsContent value="pipeline" className="tab-content-fade">
              {/* Pipeline stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Screening', count: stageCounts.screening, color: 'text-amber-500' },
                  { label: 'Interview', count: stageCounts.interview, color: 'text-blue-500' },
                  { label: 'Offer', count: stageCounts.offer, color: 'text-green-500' },
                  { label: 'Hired', count: stageCounts.hired, color: 'text-emerald-500' },
                ].map((s) => (
                  <div key={s.label} className="border border-glass-border/40 bg-glass-bg/20 rounded-lg p-4 text-center">
                    <p className={cn('font-bold', s.color)} style={{ fontSize: 'var(--text-lg)' }}>{s.count}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              <SmartTable
                data={job.candidates as unknown as Record<string, unknown>[]}
                columns={candidateColumns}
                searchable
                searchPlaceholder="Search candidates..."
                emptyMessage="No candidates found"
              />
            </TabsContent>

            <TabsContent value="details" className="tab-content-fade">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 border border-glass-border/40 bg-glass-bg/20 rounded-lg p-6">
                  <h2
                    className="font-semibold text-foreground mb-4"
                    style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
                  >
                    Job Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--text-sm)' }}>
                    {job.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-glass-border/40 bg-glass-bg/20 rounded-lg p-6">
                    <h3
                      className="font-semibold text-foreground mb-4"
                      style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-tight)' }}
                    >
                      Job Info
                    </h3>
                    <div className="space-y-4">
                      <InfoItem icon={MapPin} label="Location" value={job.location} />
                      <InfoItem icon={CalendarDays} label="Posted" value={new Date(job.postedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                      <InfoItem icon={Users} label="Applicants" value={String(job.applicants)} />
                      <InfoItem icon={Clock} label="Type" value={job.type} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageTransition>
  );
}
