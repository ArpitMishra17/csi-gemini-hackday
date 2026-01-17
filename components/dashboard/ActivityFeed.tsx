'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Activity,
    Play,
    CheckCircle,
    MessageCircle,
    Compass,
    LogIn,
    Eye,
    Star
} from 'lucide-react';

interface ActivityItem {
    id: string;
    type: string;
    metadata?: {
        careerName?: string;
        scenarioTitle?: string;
        pagePath?: string;
        details?: string;
    };
    createdAt: string;
}

interface ActivityFeedProps {
    activities: ActivityItem[];
}

const activityConfig: Record<string, {
    icon: React.ElementType;
    label: string;
    color: string;
}> = {
    scenario_start: {
        icon: Play,
        label: 'Started scenario',
        color: 'text-blue-500 bg-blue-500/10'
    },
    scenario_complete: {
        icon: CheckCircle,
        label: 'Completed scenario',
        color: 'text-green-500 bg-green-500/10'
    },
    chat_message: {
        icon: MessageCircle,
        label: 'Chat message',
        color: 'text-purple-500 bg-purple-500/10'
    },
    career_explore: {
        icon: Compass,
        label: 'Explored career',
        color: 'text-orange-500 bg-orange-500/10'
    },
    onboarding_complete: {
        icon: Star,
        label: 'Completed onboarding',
        color: 'text-yellow-500 bg-yellow-500/10'
    },
    login: {
        icon: LogIn,
        label: 'Logged in',
        color: 'text-gray-500 bg-gray-500/10'
    },
    page_visit: {
        icon: Eye,
        label: 'Visited page',
        color: 'text-cyan-500 bg-cyan-500/10'
    },
};

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
    return (
        <Card className="h-full">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[500px] px-6">
                    {activities.length === 0 ? (
                        <div className="py-8 text-center">
                            <Activity className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm">
                                No activity yet. Start exploring careers!
                            </p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

                            <div className="space-y-4 pb-6">
                                {activities.map((activity, index) => {
                                    const config = activityConfig[activity.type] || {
                                        icon: Activity,
                                        label: activity.type,
                                        color: 'text-gray-500 bg-gray-500/10',
                                    };
                                    const Icon = config.icon;

                                    return (
                                        <div key={activity.id || index} className="relative flex gap-4 pl-2">
                                            {/* Icon */}
                                            <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${config.color}`}>
                                                <Icon className="h-4 w-4" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 pt-1">
                                                <p className="text-sm font-medium leading-tight">
                                                    {config.label}
                                                    {activity.metadata?.careerName && (
                                                        <span className="text-primary"> • {activity.metadata.careerName}</span>
                                                    )}
                                                </p>
                                                {activity.metadata?.scenarioTitle && (
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {activity.metadata.scenarioTitle}
                                                    </p>
                                                )}
                                                {activity.metadata?.pagePath && (
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {activity.metadata.pagePath}
                                                    </p>
                                                )}
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    {formatTimeAgo(activity.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
