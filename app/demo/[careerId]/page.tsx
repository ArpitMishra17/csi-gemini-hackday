'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ScenarioCard, ProgressTracker } from '@/components/demo';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface Career {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

interface Scenario {
  _id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
}

export default function CareerDetailPage({ params }: { params: Promise<{ careerId: string }> }) {
  const { careerId } = use(params);

  const [career, setCareer] = useState<Career | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get user ID from localStorage for progress tracking
        const odUserId = localStorage.getItem('demo-user-id');
        const url = odUserId
          ? `/api/careers/${careerId}/scenarios?odUserId=${encodeURIComponent(odUserId)}`
          : `/api/careers/${careerId}/scenarios`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setCareer(data.career);
        setScenarios(data.scenarios);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (careerId) {
      fetchData();
    }
  }, [careerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/10">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
          <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded w-1/2 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-muted/10 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-destructive/20 bg-destructive/5">
          <CardContent className="p-6 text-center">
            <p className="text-destructive font-medium mb-4">{error || 'Career not found'}</p>
            <Button asChild variant="outline">
              <Link href="/demo">Back to Careers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Button asChild variant="ghost" size="sm" className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
            <Link href="/demo" className="gap-1 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{career.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{career.name}</h1>
              <p className="text-muted-foreground mt-1">{career.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Scenarios */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress Tracker */}
        {scenarios.length > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6 pb-4">
              <h2 className="text-sm font-medium text-muted-foreground mb-4 text-center">
                Your Progress
              </h2>
              <ProgressTracker
                scenarios={scenarios.map(s => ({
                  _id: s._id,
                  title: s.title,
                  completed: s.completed,
                }))}
              />
              <p className="text-xs text-muted-foreground text-center mt-3">
                {scenarios.filter(s => s.completed).length} of {scenarios.length} scenarios completed
              </p>
            </CardContent>
          </Card>
        )}

        <h2 className="text-lg font-semibold mb-4">
          Available Scenarios
        </h2>
        {scenarios.length === 0 ? (
          <Card className="text-center bg-muted/50">
            <CardContent className="p-8">
              <p className="text-muted-foreground">No scenarios available for this career yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario._id}
                scenario={scenario}
                careerId={careerId}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
