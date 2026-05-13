'use client';

import type { OnboardingStage } from '../types';
import { ONBOARDING_STAGES } from '../constants';
import { Check, Circle } from 'lucide-react';

interface OnboardingProgressProps {
  currentStage: OnboardingStage;
  completionPct: number;
  startDate: string;
  className?: string;
}

const STAGE_ORDER: OnboardingStage[] = ['pre-boarding', 'day-one', 'week-one', 'month-one', 'completed'];

export function OnboardingProgress({ currentStage, completionPct, startDate, className }: OnboardingProgressProps) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  return (
    <div className={className}>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm font-bold text-module-erp">{completionPct}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-module-erp to-module-erp/70 transition-all duration-700"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          Started on {startDate} · Currently at {ONBOARDING_STAGES[currentStage]}
        </p>
      </div>

      {/* Stage Stepper */}
      <div className="flex items-center justify-between">
        {STAGE_ORDER.map((stage, i) => {
          const isCompleted = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isUpcoming = i > currentIndex;

          return (
            <div key={stage} className="flex flex-col items-center flex-1">
              {/* Connector line */}
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div className={`flex-1 h-0.5 transition-colors duration-500 ${i <= currentIndex ? 'bg-module-erp' : 'bg-white/10'}`} />
                )}
                {/* Circle indicator */}
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-300
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${isCurrent ? 'bg-module-erp text-white ring-4 ring-module-erp/20' : ''}
                    ${isUpcoming ? 'bg-white/10 text-muted-foreground/40' : ''}
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" strokeWidth={2} />
                  ) : (
                    <Circle className="h-3 w-3" strokeWidth={2} />
                  )}
                </div>
                {i < STAGE_ORDER.length - 1 && (
                  <div className={`flex-1 h-0.5 transition-colors duration-500 ${i < currentIndex ? 'bg-green-500' : 'bg-white/10'}`} />
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium text-center transition-colors ${
                  isCompleted ? 'text-green-500' : isCurrent ? 'text-module-erp' : 'text-muted-foreground/40'
                }`}
              >
                {ONBOARDING_STAGES[stage]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
