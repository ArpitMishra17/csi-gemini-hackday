'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Stethoscope,
    Code,
    Building2,
    Scale,
    Calculator,
    Newspaper,
    GraduationCap,
    LayoutGrid,
    ArrowLeft,
    BookOpen,
    PlayCircle,
    MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EXPLORE_CAREERS, CAREER_CATEGORIES, type ExploreCareer } from '@/data/explore-careers';

// Map icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
    Stethoscope: <Stethoscope className="w-6 h-6" />,
    Code: <Code className="w-6 h-6" />,
    Building2: <Building2 className="w-6 h-6" />,
    Scale: <Scale className="w-6 h-6" />,
    Calculator: <Calculator className="w-6 h-6" />,
    Newspaper: <Newspaper className="w-6 h-6" />,
    GraduationCap: <GraduationCap className="w-6 h-6" />,
    LayoutGrid: <LayoutGrid className="w-5 h-5" />,
};

// Color map for career cards
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
    cyan: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800' },
    rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-800' },
    orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
};

function CareerExploreCard({ career }: { career: ExploreCareer }) {
    const colors = colorMap[career.color] || colorMap.blue;

    return (
        <Link href={`/explore/${career.slug}`}>
            <Card className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 ${colors.border}`}>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text}`}>
                            {iconMap[career.icon] || <Code className="w-6 h-6" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{career.name}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                                {career.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {career.skills.slice(0, 3).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 pt-4 border-t flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <PlayCircle className="w-3.5 h-3.5" />
                            <span>{career.videos.length || 'Coming'} videos</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{career.articles.length || 'Coming'} articles</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredCareers = activeCategory === 'all'
        ? EXPLORE_CAREERS
        : EXPLORE_CAREERS.filter(c => c.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button asChild variant="ghost" size="icon" className="shrink-0">
                                <Link href="/" title="Back to Home">
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                            </Button>
                            <div>
                                <h1 className="text-xl font-bold flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    Watch & Read
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Explore careers through videos and articles
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                                <Link href="/demo" className="gap-2">
                                    <PlayCircle className="w-4 h-4" />
                                    Try Demos
                                </Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/chat" className="gap-2">
                                    <MessageCircle className="w-4 h-4" />
                                    Ask AI
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="mb-8">
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">Filter by Category</h2>
                    <div className="flex flex-wrap gap-2">
                        {CAREER_CATEGORIES.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setActiveCategory(category.id)}
                                className="gap-2"
                            >
                                {iconMap[category.icon]}
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Career Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCareers.map((career) => (
                        <CareerExploreCard key={career.id} career={career} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredCareers.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-muted-foreground">No careers found in this category yet.</p>
                            <Button
                                variant="link"
                                onClick={() => setActiveCategory('all')}
                                className="mt-2"
                            >
                                View all careers
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
