'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    ArrowLeft,
    Calendar,
    Globe,
    Timer,
    GraduationCap,
    CheckCircle2,
    BookOpen,
    AlertCircle,
    MessageCircle,
    ChevronRight,
    MapPin,
    FileText,
    PlayCircle,
    Clock,
    Quote,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EXPLORE_EXAMS } from '@/data/explore-exams';

// Color map for theming (matching Career page)
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
    params: Promise<{ examId: string }>;
}

export default function ExamDetailPage({ params }: PageProps) {
    const { examId } = use(params);
    const exam = EXPLORE_EXAMS.find((e) => e.id === examId);

    if (!exam) {
        notFound();
    }

    const colors = colorMap[exam.color] || colorMap.blue;

    return (
        <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-12">
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
                                <p className="text-sm text-muted-foreground">Entrance Exams</p>
                                <h1 className="text-lg font-semibold">{exam.shortName}</h1>
                            </div>
                        </div>
                        <Button asChild size="sm">
                            <Link href="/chat" className="gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Ask AI Assistant
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className={`bg-gradient-to-b ${colors.gradient}`}>
                <div className="max-w-5xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm ${colors.bg} ${colors.text}`}>
                            <GraduationCap className="w-10 h-10" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">{exam.name}</h1>
                            <p className="text-lg text-muted-foreground mb-4">
                                {exam.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="bg-background/50 backdrop-blur-sm">
                                    {exam.level} Level
                                </Badge>
                                <Badge variant="secondary" className="bg-background/50 backdrop-blur-sm capitalize">
                                    {exam.category}
                                </Badge>
                            </div>
                            <Button asChild size="sm" variant="outline" className="shadow-sm">
                                <a href={exam.website} target="_blank" rel="noopener noreferrer" className="gap-2">
                                    <Globe className="w-4 h-4" />
                                    Official Website
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

                {/* Key Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Exam Overview & Pattern */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className={`w-5 h-5 ${colors.text}`} />
                                Exam Pattern
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Timer className={`w-5 h-5 mt-0.5 ${colors.text}`} />
                                    <div>
                                        <p className="font-medium">Duration</p>
                                        <p className="text-muted-foreground">{exam.pattern.duration}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-start gap-3">
                                    <MapPin className={`w-5 h-5 mt-0.5 ${colors.text}`} />
                                    <div>
                                        <p className="font-medium">Mode</p>
                                        <p className="text-muted-foreground">{exam.mode}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className={`w-5 h-5 mt-0.5 ${colors.text}`} />
                                    <div>
                                        <p className="font-medium">Marking Scheme</p>
                                        <p className="text-muted-foreground">{exam.pattern.markingScheme}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Eligibility */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className={`w-5 h-5 ${colors.text}`} />
                                Eligibility Criteria
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {exam.eligibility.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <ChevronRight className={`w-5 h-5 mt-0.5 ${colors.text}`} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Important Dates (Timeline Style) */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className={`w-5 h-5 ${colors.text}`} />
                            Important Dates (Tentative)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {exam.importantDates.map((date, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className={`font-mono text-sm px-2 py-1 rounded ${colors.bg} ${colors.text} whitespace-nowrap min-w-[100px] text-center`}>
                                        {date.month}
                                    </div>
                                    <div className="flex-1 pt-1 font-medium">{date.event}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Subjects */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className={`w-5 h-5 ${colors.text}`} />
                            Subjects Covered
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {exam.pattern.subjects.map((subject, index) => (
                                <Badge key={index} variant="secondary" className="px-3 py-1">
                                    {subject}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quotes Section */}
                {exam.quotes.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Quote className={`w-5 h-5 ${colors.text}`} />
                                Motivation & Insight
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {exam.quotes.map((quote, index) => (
                                    <blockquote key={index} className="border-l-4 border-primary/30 pl-4">
                                        <p className="italic text-lg mb-2">&ldquo;{quote.text}&rdquo;</p>
                                        <footer className="text-sm text-muted-foreground">
                                            — <strong>{quote.author}</strong>{quote.role && `, ${quote.role}`}
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Separator />

                {/* Videos Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <PlayCircle className={`w-6 h-6 ${colors.text}`} />
                        Preparation Videos
                    </h2>

                    {exam.videos.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {exam.videos.map((video) => (
                                <Card key={video.id} className="overflow-hidden">
                                    <div className="aspect-video relative">
                                        <iframe
                                            src={video.youtubeUrl}
                                            title={video.title}
                                            className="w-full h-full absolute inset-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-medium line-clamp-2">{video.title}</h3>
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
                                <p className="text-muted-foreground mb-2">Preparation videos coming soon!</p>
                            </CardContent>
                        </Card>
                    )}
                </section>

                {/* Articles Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen className={`w-6 h-6 ${colors.text}`} />
                        Study Resources
                    </h2>

                    {exam.articles.length > 0 ? (
                        <div className="space-y-4">
                            {exam.articles.map((article) => (
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
                                <p className="text-muted-foreground mb-2">Study resources coming soon!</p>
                            </CardContent>
                        </Card>
                    )}
                </section>

                {/* Disclaimer */}
                <div className="bg-muted/50 border rounded-lg p-4 flex gap-3 text-sm text-muted-foreground">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>
                        <strong>Note:</strong> Exam dates and patterns are subject to change by the conducting authority.
                        Always check the official website for the latest notifications.
                    </p>
                </div>

                {/* CTA Section */}
                <Card className={`${colors.bg} border-2 ${colors.border}`}>
                    <CardContent className="py-8 text-center">
                        <h3 className="text-xl font-semibold mb-2">Need help preparing for {exam.shortName}?</h3>
                        <p className="text-muted-foreground mb-4">
                            Our AI assistant can help you create a study plan or answer specific questions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button asChild size="lg">
                                <Link href="/chat" className="gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    Create Study Plan
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
