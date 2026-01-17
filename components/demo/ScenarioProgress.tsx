'use client';

import { cn } from '@/lib/utils';

interface ScenarioProgressProps {
  currentStage: number;
  totalStages: number;
}

export default function ScenarioProgress({ currentStage, totalStages }: ScenarioProgressProps) {
  const progress = (currentStage / totalStages) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">
          Stage {currentStage} of {totalStages}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}% complete
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalStages }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index < currentStage
                ? 'bg-primary'
                : index === currentStage - 1
                ? 'bg-primary ring-4 ring-primary/20'
                : 'bg-muted'
            )}
          />
        ))}
      </div>
    </div>
  );
}
