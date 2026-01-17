'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    ArrowLeft,
    BookOpen,
    PlayCircle,
    Clock,
    ExternalLink,
    Quote,
    Briefcase,
    GraduationCap,
    IndianRupee,
    Globe,
    ChevronRight,
    MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getCareerBySlug, type ExploreCareer } from '@/data/explore-careers';

// Color map for theming
const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    emerald: {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800',
        gradient: 'from-emerald-500/10 to-transparent'
    },
    blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        gradient: 'from-blue-500/10 to-transparent'
    },
    amber: {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        gradient: 'from-amber-500/10 to-transparent'
    },
    purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        gradient: 'from-purple-500/10 to-transparent'
    },
    cyan: {
        bg: 'bg-cyan-100 dark:bg-cyan-900/30',
        text: 'text-cyan-600 dark:text-cyan-400',
        border: 'border-cyan-200 dark:border-cyan-800',
        gradient: 'from-cyan-500/10 to-transparent'
    },
    rose: {
        bg: 'bg-rose-100 dark:bg-rose-900/30',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800',
        gradient: 'from-rose-500/10 to-transparent'
    },
    orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        gradient: 'from-orange-500/10 to-transparent'
    },
};

interface PageProps {
    params: Promise<{ careerId: string }>;
}

export default function CareerDetailPage({ params }: PageProps) {
    const { careerId } = use(params);
    const career = getCareerBySlug(careerId);

    if (!career) {
        notFound();
    }

    const colors = colorMap[career.color] || colorMap.blue;

    return (
        <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button asChild variant="ghost" size="icon" className="shrink-0">
                                <Link href="/explore" title="Back to Explore">
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                            </Button>
                            <div>
                                <p className="text-sm text-muted-foreground">Watch & Read</p>
                                <h1 className="text-lg font-semibold">{career.name}</h1>
                            </div>
                        </div>
                        <Button asChild size="sm">
                            <Link href={`/chat?career=${encodeURIComponent(career.name)}`} className="gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Ask about this career
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className={`bg-gradient-to-b ${colors.gradient}`}>
                <div className="max-w-5xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${colors.bg} ${colors.text}`}>
                            <Briefcase className="w-10 h-10" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">{career.name}</h1>
                            <p className="text-lg text-muted-foreground mb-4">
                                {career.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {career.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                {/* What They Do */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className={`w-5 h-5 ${colors.text}`} />
                            What They Do
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {career.whatTheyDo.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <ChevronRight className={`w-5 h-5 mt-0.5 ${colors.text}`} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Day-to-Day Challenges */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className={`w-5 h-5 ${colors.text}`} />
                            Day-to-Day Challenges
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {career.dayToDayChallenges.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <ChevronRight className={`w-5 h-5 mt-0.5 ${colors.text}`} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* A Day in the Life */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className={`w-5 h-5 ${colors.text}`} />
                            A Day in the Life
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {career.dayInLife.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className={`font-mono text-sm px-2 py-1 rounded ${colors.bg} ${colors.text} whitespace-nowrap`}>
                                        {item.time}
                                    </div>
                                    <div className="flex-1 pt-1">{item.activity}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Education Path */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className={`w-5 h-5 ${colors.text}`} />
                                Education in India
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {career.education.india.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full mt-2 ${colors.bg.replace('bg-', 'bg-').replace('/30', '')}`} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className={`w-5 h-5 ${colors.text}`} />
                                Education Abroad
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {career.education.abroad.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full mt-2 ${colors.bg.replace('bg-', 'bg-').replace('/30', '')}`} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Salary Range */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <IndianRupee className={`w-5 h-5 ${colors.text}`} />
                            Salary Expectations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <span className="text-lg">🇮🇳</span> India
                                </h4>
                                <p className="text-muted-foreground">{career.salaryRange.india}</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <span className="text-lg">🌍</span> Abroad
                                </h4>
                                <p className="text-muted-foreground">{career.salaryRange.abroad}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quotes Section */}
                {career.quotes.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Quote className={`w-5 h-5 ${colors.text}`} />
                                Words of Wisdom
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {career.quotes.map((quote, index) => (
                                    <blockquote key={index} className="border-l-4 border-primary/30 pl-4">
                                        <p className="italic text-lg mb-2">&ldquo;{quote.text}&rdquo;</p>
                                        <footer className="text-sm text-muted-foreground">
                                            — <strong>{quote.author}</strong>, {quote.role}
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Placeholder for quotes if empty */}
                {career.quotes.length === 0 && (
                    <Card className={`border-2 border-dashed ${colors.border}`}>
                        <CardContent className="py-8 text-center">
                            <Quote className={`w-10 h-10 mx-auto mb-3 ${colors.text} opacity-50`} />
                            <p className="text-muted-foreground">Inspiring quotes coming soon!</p>
                        </CardContent>
                    </Card>
                )}

                <Separator />

                {/* Videos Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <PlayCircle className={`w-6 h-6 ${colors.text}`} />
                        Videos to Watch
                    </h2>

                    {career.videos.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {career.videos.map((video) => (
                                <Card key={video.id} className="overflow-hidden">
                                    <div className="aspect-video">
                                        <iframe
                                            src={video.youtubeUrl}
                                            title={video.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-medium">{video.title}</h3>
                                        {video.duration && (
                                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {video.duration}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className={`border-2 border-dashed ${colors.border}`}>
                            <CardContent className="py-12 text-center">
                                <PlayCircle className={`w-12 h-12 mx-auto mb-3 ${colors.text} opacity-50`} />
                                <p className="text-muted-foreground mb-2">Video content coming soon!</p>
                                <p className="text-sm text-muted-foreground">
                                    We&apos;re curating the best videos about this career path.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </section>

                {/* Articles Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen className={`w-6 h-6 ${colors.text}`} />
                        Articles to Read
                    </h2>

                    {career.articles.length > 0 ? (
                        <div className="space-y-4">
                            {career.articles.map((article) => (
                                <a
                                    key={article.id}
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Card className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">{article.title}</h3>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                                    <span>{article.source}</span>
                                                    {article.readTime && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-3.5 h-3.5" />
                                                                {article.readTime}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-muted-foreground" />
                                        </CardContent>
                                    </Card>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <Card className={`border-2 border-dashed ${colors.border}`}>
                            <CardContent className="py-12 text-center">
                                <BookOpen className={`w-12 h-12 mx-auto mb-3 ${colors.text} opacity-50`} />
                                <p className="text-muted-foreground mb-2">Article links coming soon!</p>
                                <p className="text-sm text-muted-foreground">
                                    We&apos;re gathering the best resources for you.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </section>

                {/* CTA Section */}
                <Card className={`${colors.bg} border-2 ${colors.border}`}>
                    <CardContent className="py-8 text-center">
                        <h3 className="text-xl font-semibold mb-2">Want to experience being a {career.name}?</h3>
                        <p className="text-muted-foreground mb-4">
                            Try our interactive demo to see what a day in this career looks like.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button asChild size="lg">
                                <Link href="/demo" className="gap-2">
                                    <PlayCircle className="w-5 h-5" />
                                    Try Career Demo
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href={`/chat?career=${encodeURIComponent(career.name)}`} className="gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    Ask AI Questions
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
