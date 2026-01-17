'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressTrackerProps {
  scenarios: {
    _id: string;
    title: string;
    completed: boolean;
  }[];
  currentIndex?: number;
}

export default function ProgressTracker({ scenarios, currentIndex }: ProgressTrackerProps) {
  // Find the first incomplete scenario as the current one if not specified
  const activeIndex = currentIndex ?? scenarios.findIndex(s => !s.completed);
  const effectiveActiveIndex = activeIndex === -1 ? scenarios.length : activeIndex;

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center justify-center min-w-fit px-4">
        {scenarios.map((scenario, index) => {
          const isCompleted = scenario.completed;
          const isCurrent = index === effectiveActiveIndex;
          const isPending = index > effectiveActiveIndex;

          return (
            <div key={scenario._id} className="flex items-center">
              {/* Step circle and label */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                    isCompleted && 'bg-primary text-primary-foreground',
                    isCurrent && 'border-2 border-primary text-primary bg-background',
                    isPending && 'bg-primary/80 text-primary-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" strokeWidth={3} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium text-center max-w-[80px] truncate',
                    isCompleted && 'text-foreground',
                    isCurrent && 'text-foreground',
                    isPending && 'text-muted-foreground'
                  )}
                  title={scenario.title}
                >
                  {scenario.title}
                </span>
              </div>

              {/* Connector line */}
              {index < scenarios.length - 1 && (
                <div
                  className={cn(
                    'w-8 h-0.5 mx-1 mt-[-20px]',
                    index < effectiveActiveIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
