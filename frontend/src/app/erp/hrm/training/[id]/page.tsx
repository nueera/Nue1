'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Users,
  Star,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeedbackItem {
  id: string;
  employeeName: string;
  rating: number;
  comment: string;
  date: string;
}

const mockTrainingDetails: Record<string, {
  title: string;
  instructor: string;
  department: string;
  startDate: string;
  endDate: string;
  status: string;
  enrolled: number;
  capacity: number;
  description: string;
  feedback: FeedbackItem[];
}> = {
  'tp-1': {
    title: 'React Advanced Patterns',
    instructor: 'David Park',
    department: 'Engineering',
    startDate: '2025-03-10',
    endDate: '2025-03-14',
    status: 'upcoming',
    enrolled: 12,
    capacity: 15,
    description: 'An intensive 5-day workshop covering advanced React patterns including compound components, render props, hooks patterns, state machines, and performance optimization techniques. Participants will build real-world applications using these patterns.',
    feedback: [
      { id: 'fb-1', employeeName: 'Sarah Wilson', rating: 5, comment: 'Excellent course content and presentation!', date: '2025-03-14' },
      { id: 'fb-2', employeeName: 'Alex Brown', rating: 4, comment: 'Good practical examples, could use more time for exercises.', date: '2025-03-14' },
      { id: 'fb-3', employeeName: 'Lisa Chen', rating: 5, comment: 'David is an amazing instructor. Very clear explanations.', date: '2025-03-15' },
    ],
  },
  'tp-2': {
    title: 'Leadership Workshop',
    instructor: 'External Trainer',
    department: 'All',
    startDate: '2025-03-05',
    endDate: '2025-03-07',
    status: 'in-progress',
    enrolled: 20,
    capacity: 20,
    description: 'A comprehensive leadership development workshop focusing on emotional intelligence, team dynamics, conflict resolution, and strategic thinking. Designed for emerging leaders and managers.',
    feedback: [],
  },
};

const statusBadgeClass: Record<string, string> = {
  upcoming: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  completed: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
};

const feedbackColumns: ColumnDef<FeedbackItem>[] = [
  {
    accessorKey: 'employeeName',
    header: 'Employee',
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
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
    accessorKey: 'comment',
    header: 'Comment',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
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

export default function TrainingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const training = mockTrainingDetails[id];

  if (!training) {
    return (
      <PageTransition>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-12 text-center">
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>Training program not found</p>
            <button
              onClick={() => router.push('/erp/hrm/training')}
              className="mt-4 text-module-erp hover:underline"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              Back to Training
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const avgRating = training.feedback.length > 0
    ? (training.feedback.reduce((a, f) => a + f.rating, 0) / training.feedback.length).toFixed(1)
    : 'N/A';

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => router.push('/erp/hrm/training')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-[var(--motion-fast)] mb-6 press-scale"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          <span style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
            Back to Training
          </span>
        </motion.button>

        {/* Training header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6 sm:p-8 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-module-erp/10 text-module-erp shrink-0">
              <GraduationCap className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  className="font-bold text-foreground"
                  style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
                >
                  {training.title}
                </h1>
                <Badge
                  variant="outline"
                  className={cn('capitalize', statusBadgeClass[training.status] || '')}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {training.status.replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
                {training.instructor} &middot; {training.department}
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
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="tab-content-fade">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 border border-glass-border/40 bg-glass-bg/20 rounded-lg p-6">
                  <h2
                    className="font-semibold text-foreground mb-4"
                    style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
                  >
                    Program Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--text-sm)' }}>
                    {training.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-glass-border/40 bg-glass-bg/20 rounded-lg p-6">
                    <h3
                      className="font-semibold text-foreground mb-4"
                      style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-tight)' }}
                    >
                      Program Info
                    </h3>
                    <div className="space-y-4">
                      <InfoItem icon={BookOpen} label="Instructor" value={training.instructor} />
                      <InfoItem icon={CalendarDays} label="Duration" value={`${new Date(training.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(training.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`} />
                      <InfoItem icon={Users} label="Enrollment" value={`${training.enrolled}/${training.capacity}`} />
                      <InfoItem icon={Star} label="Avg Rating" value={avgRating !== 'N/A' ? `${avgRating}/5` : 'No ratings yet'} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="tab-content-fade">
              {training.feedback.length > 0 ? (
                <SmartTable
                  data={training.feedback as unknown as Record<string, unknown>[]}
                  columns={feedbackColumns}
                  searchable={false}
                  emptyMessage="No feedback yet"
                />
              ) : (
                <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-12 text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-module-erp/10 text-module-erp mx-auto mb-4">
                    <MessageSquare className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <p className="text-foreground font-medium" style={{ fontSize: 'var(--text-base)' }}>No Feedback Yet</p>
                  <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                    Feedback will appear after the training program is completed
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageTransition>
  );
}
