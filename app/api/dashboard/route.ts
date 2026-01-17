import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import UserActivity from '@/models/UserActivity';

interface JWTPayload {
    userId: string;
    email: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserDoc = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActivityDoc = any;

// GET /api/dashboard - Get user dashboard data
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let userId: string;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JWTPayload;
            userId = decoded.userId;
        } catch {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        await dbConnect();

        // Fetch user data
        const user: UserDoc = await User.findById(userId).select('-password').lean();
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Fetch recent activities (last 15)
        const recentActivities: ActivityDoc[] = await UserActivity.find({ userId })
            .sort({ createdAt: -1 })
            .limit(15)
            .lean();

        // Parse interests from onboarding data
        const interests = user.onboardingData?.interests
            ? user.onboardingData.interests.split(',').map((i: string) => i.trim()).filter(Boolean)
            : [];

        // Get activity stats
        const activityStats = await UserActivity.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: '$activityType', count: { $sum: 1 } } },
        ]);

        const statsMap = activityStats.reduce((acc: Record<string, number>, stat: { _id: string; count: number }) => {
            acc[stat._id] = stat.count;
            return acc;
        }, {} as Record<string, number>);

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                currentStreak: user.currentStreak || 0,
                longestStreak: user.longestStreak || 0,
                lastActiveAt: user.lastActiveAt,
                createdAt: user.createdAt,
                isOnboarded: user.isOnboarded,
            },
            interests,
            onboardingData: {
                skills: user.onboardingData?.skills || '',
                aims: user.onboardingData?.aims || '',
                grade: user.onboardingData?.grade || '',
                explorationPreference: user.onboardingData?.explorationPreference || [],
            },
            recentActivities: recentActivities.map(activity => ({
                id: activity._id,
                type: activity.activityType,
                metadata: activity.metadata,
                createdAt: activity.createdAt,
            })),
            stats: {
                totalActivities: (Object.values(statsMap) as number[]).reduce((a, b) => a + b, 0),
                scenariosStarted: statsMap['scenario_start'] || 0,
                scenariosCompleted: statsMap['scenario_complete'] || 0,
                chatMessages: statsMap['chat_message'] || 0,
                careersExplored: statsMap['career_explore'] || 0,
            },
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}
