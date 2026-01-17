'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CareerCard } from '@/components/demo';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Career {
  _id: string;
  name: string;
  description: string;
  icon: string;
  skills: string[];
  relevanceScore?: number;
}

export default function DemoPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCareers() {
      try {
        // For now, fetch all careers
        // In production, this would include user profile params
        const response = await fetch('/api/careers/recommended');
        if (!response.ok) throw new Error('Failed to fetch careers');
        const data = await response.json();
        setCareers(data.careers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCareers();
  }, []);

  return (
    <div className="min-h-screen bg-muted/10">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Career Demo</h1>
              <p className="text-muted-foreground mt-1">
                Experience real-world scenarios from different careers
              </p>
            </div>
            <Button asChild>
              <Link href="/chat" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Career Chatbot
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="bg-destructive/10 border-destructive/20 text-center">
            <CardContent className="p-6">
              <p className="text-destructive font-medium">{error}</p>
              <Button 
                variant="destructive" 
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : careers.length === 0 ? (
          <Card className="text-center">
            <CardContent className="p-8">
              <p className="text-muted-foreground">No careers available yet. Please seed the database.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                Recommended for you
              </h2>
              <p className="text-muted-foreground text-sm">
                Choose a career to explore interactive scenarios and discover if it&apos;s right for you.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {careers.map((career) => (
                <CareerCard
                  key={career._id}
                  career={career}
                  relevanceScore={career.relevanceScore}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
