'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, RefreshCw, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Recommendation {
    career: string;
    matchScore: number;
    reason: string;
    nextSteps: string[];
}

interface RecommendationsData {
    recommendations: Recommendation[];
    insight: string;
    generatedAt: string;
}

export function RecommendationsSection() {
    const [data, setData] = useState<RecommendationsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/recommendations');
            if (!response.ok) throw new Error('Failed to fetch');
            const result = await response.json();
            setData(result);
        } catch {
            setError('Unable to load recommendations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-yellow-500';
        return 'bg-orange-500';
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    AI Career Recommendations
                </CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchRecommendations}
                    disabled={loading}
                >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
            </CardHeader>
            <CardContent>
                {loading && (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Generating recommendations...</span>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">{error}</p>
                        <Button variant="outline" size="sm" onClick={fetchRecommendations} className="mt-2">
                            Try Again
                        </Button>
                    </div>
                )}

                {!loading && !error && data && (
                    <div className="space-y-4">
                        {/* AI Insight */}
                        {data.insight && (
                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                <p className="text-sm text-foreground/80 italic">💡 {data.insight}</p>
                            </div>
                        )}

                        {/* Recommendations Grid */}
                        <div className="grid gap-3">
                            {data.recommendations.map((rec, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold text-lg">{rec.career}</h4>
                                        <Badge className={`${getScoreColor(rec.matchScore)} text-white`}>
                                            {rec.matchScore}% Match
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>

                                    {rec.nextSteps && rec.nextSteps.length > 0 && (
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-muted-foreground">Next Steps:</p>
                                            <ul className="text-sm space-y-1">
                                                {rec.nextSteps.slice(0, 2).map((step, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                        {step}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Explore CTA */}
                        <div className="pt-2">
                            <Link href="/demo">
                                <Button variant="outline" className="w-full gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    Explore Career Scenarios
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
