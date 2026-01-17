'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface ScenarioCardProps {
  scenario: {
    _id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    completed?: boolean;
  };
  careerId: string;
}

const difficultyVariants = {
  beginner: 'secondary' as const,
  intermediate: 'outline' as const,
  advanced: 'destructive' as const,
};

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export default function ScenarioCard({ scenario, careerId }: ScenarioCardProps) {
  const isCompleted = scenario.completed;

  return (
    <Link href={`/demo/${careerId}/${scenario._id}`}>
      <Card className={`hover:ring-primary/50 hover:ring-2 transition-all cursor-pointer group ${isCompleted ? 'border-primary/30 bg-primary/5' : ''}`}>
        <CardContent className="pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {isCompleted && (
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                )}
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {scenario.title}
                </h3>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                {scenario.description}
              </p>
            </div>
            <Badge variant={difficultyVariants[scenario.difficulty]}>
              {difficultyLabels[scenario.difficulty]}
            </Badge>
          </div>
          <div className="mt-4 flex justify-end">
            <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              {isCompleted ? (
                <>
                  Replay scenario
                  <RotateCcw className="w-4 h-4" />
                </>
              ) : (
                <>
                  Start scenario
                  <PlayCircle className="w-4 h-4" />
                </>
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
