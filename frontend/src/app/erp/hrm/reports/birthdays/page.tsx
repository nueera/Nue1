'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { Cake } from 'lucide-react';
import { cn } from '@/lib/utils';

const birthdayData = [
  { id: '1', name: 'Sarah Wilson', department: 'Design', birthday: 'Mar 8', upcoming: true, daysAway: 5 },
  { id: '2', name: 'Alex Brown', department: 'Sales', birthday: 'Mar 12', upcoming: true, daysAway: 9 },
  { id: '3', name: 'Lisa Chen', department: 'Analytics', birthday: 'Mar 18', upcoming: true, daysAway: 15 },
  { id: '4', name: 'Tom Garcia', department: 'Engineering', birthday: 'Mar 22', upcoming: true, daysAway: 19 },
  { id: '5', name: 'Rachel Kim', department: 'Marketing', birthday: 'Mar 28', upcoming: true, daysAway: 25 },
  { id: '6', name: 'Chris Taylor', department: 'Operations', birthday: 'Apr 3', upcoming: false, daysAway: 31 },
  { id: '7', name: 'Nina Patel', department: 'Finance', birthday: 'Apr 10', upcoming: false, daysAway: 38 },
  { id: '8', name: 'James Lee', department: 'Engineering', birthday: 'Apr 15', upcoming: false, daysAway: 43 },
  { id: '9', name: 'Maria Garcia', department: 'HR', birthday: 'Apr 22', upcoming: false, daysAway: 50 },
  { id: '10', name: 'David Park', department: 'Engineering', birthday: 'May 1', upcoming: false, daysAway: 59 },
];

const thisMonthBirthdays = birthdayData.filter(b => b.upcoming);

export default function BirthdaysPage() {
  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500">
              <Cake className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <h1
              className="font-bold text-foreground"
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Birthday List
            </h1>
          </div>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
          >
            Upcoming employee birthdays
          </p>
        </motion.div>

        {/* This month highlights */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-6"
        >
          <h2
            className="font-semibold text-foreground mb-4"
            style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
          >
            This Month ({thisMonthBirthdays.length} birthdays)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {thisMonthBirthdays.map((person) => (
              <div
                key={person.id}
                className="glass-surface rounded-xl p-4 flex items-center gap-3 hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500/10 text-pink-500 text-sm font-semibold shrink-0">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate" style={{ fontSize: 'var(--text-sm)' }}>
                    {person.name}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    {person.department} &middot; {person.birthday}
                  </p>
                </div>
                <span className="text-pink-500 font-semibold shrink-0" style={{ fontSize: 'var(--text-xs)' }}>
                  {person.daysAway}d
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming list */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <h2
            className="font-semibold text-foreground mb-4"
            style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
          >
            Upcoming
          </h2>
          <div className="space-y-2">
            {birthdayData.filter(b => !b.upcoming).map((person) => (
              <div
                key={person.id}
                className="border border-glass-border/40 bg-glass-bg/20 rounded-lg p-4 flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-glass-hover text-muted-foreground text-xs font-semibold shrink-0">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate" style={{ fontSize: 'var(--text-sm)' }}>
                    {person.name}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    {person.department}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{person.birthday}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>{person.daysAway} days away</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
