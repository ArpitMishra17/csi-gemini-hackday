'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
    UserProfileCard,
    InterestsSection,
    RecommendationsSection,
    ActivityFeed
} from '@/components/dashboard';

interface DashboardData {
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        currentStreak: number;
        longestStreak: number;
        createdAt: string;
        isOnboarded: boolean;
    };
    interests: string[];
    onboardingData: {
        skills: string;
        aims: string;
        grade: string;
        explorationPreference: string[];
    };
    recentActivities: Array<{
        id: string;
        type: string;
        metadata: {
            careerName?: string;
            scenarioTitle?: string;
            pagePath?: string;
        };
        createdAt: string;
    }>;
    stats: {
        totalActivities: number;
        scenariosStarted: number;
        scenariosCompleted: number;
        chatMessages: number;
        careersExplored: number;
    };
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch('/api/dashboard');
                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Dashboard error:', err);
                setError('Unable to load dashboard. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive mb-4">{error || 'Something went wrong'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-primary hover:underline"
                    >
                        Refresh page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Welcome back, {data.user.name.split(' ')[0]}! 👋</h1>
                    <p className="text-muted-foreground mt-1">
                        Track your career exploration journey
                    </p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Card */}
                        <UserProfileCard
                            name={data.user.name}
                            email={data.user.email}
                            avatar={data.user.avatar}
                            memberSince={data.user.createdAt}
                        />



                        {/* Interests Section */}
                        <InterestsSection
                            interests={data.interests}
                            skills={data.onboardingData.skills}
                            aims={data.onboardingData.aims}
                        />

                        {/* Recommendations */}
                        <RecommendationsSection />

                        {/* Stats Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard
                                label="Scenarios Started"
                                value={data.stats.scenariosStarted}
                                color="bg-blue-500/10 text-blue-600"
                            />
                            <StatCard
                                label="Completed"
                                value={data.stats.scenariosCompleted}
                                color="bg-green-500/10 text-green-600"
                            />
                            <StatCard
                                label="Chat Messages"
                                value={data.stats.chatMessages}
                                color="bg-purple-500/10 text-purple-600"
                            />
                            <StatCard
                                label="Careers Explored"
                                value={data.stats.careersExplored}
                                color="bg-orange-500/10 text-orange-600"
                            />
                        </div>
                    </div>

                    {/* Right Column - Activity Feed */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20">
                            <ActivityFeed activities={data.recentActivities} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Simple stat card component
function StatCard({
    label,
    value,
    color
}: {
    label: string;
    value: number;
    color: string;
}) {
    return (
        <div className={`p-4 rounded-lg ${color}`}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm opacity-80">{label}</p>
        </div>
    );
}
