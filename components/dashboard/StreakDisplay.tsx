'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Trophy } from 'lucide-react';

interface StreakDisplayProps {
    currentStreak: number;
    longestStreak: number;
}

export function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Your Streak
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Flame className="h-6 w-6 text-orange-500" />
                            <span className="text-3xl font-bold text-orange-600">
                                {currentStreak}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Current Streak</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {currentStreak === 1 ? 'day' : 'days'} in a row
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Trophy className="h-6 w-6 text-yellow-500" />
                            <span className="text-3xl font-bold text-yellow-600">
                                {longestStreak}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Best Streak</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            your record
                        </p>
                    </div>
                </div>
                {currentStreak > 0 && (
                    <p className="text-center text-sm text-muted-foreground mt-4">
                        🔥 Keep it up! Come back tomorrow to continue your streak.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
