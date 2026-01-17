import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import UserActivity, { ActivityType, IActivityMetadata } from '@/models/UserActivity';
import User from '@/models/User';

interface JWTPayload {
    userId: string;
    email: string;
}

// Helper to get user ID from token
async function getUserIdFromToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JWTPayload;
        return decoded.userId;
    } catch {
        return null;
    }
}

// Helper to update user streak
async function updateUserStreak(userId: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user) return;

    const now = new Date();
    const lastActive = user.lastActiveAt ? new Date(user.lastActiveAt) : null;

    // Reset time to start of day for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActiveDay = lastActive
        ? new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate())
        : null;

    if (!lastActiveDay) {
        // First activity ever
        user.currentStreak = 1;
        user.longestStreak = 1;
    } else {
        const daysDiff = Math.floor((today.getTime() - lastActiveDay.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
            // Same day, no streak change
        } else if (daysDiff === 1) {
            // Consecutive day, increment streak
            user.currentStreak = (user.currentStreak || 0) + 1;
            if (user.currentStreak > (user.longestStreak || 0)) {
                user.longestStreak = user.currentStreak;
            }
        } else {
            // Streak broken, reset to 1
            user.currentStreak = 1;
        }
    }

    user.lastActiveAt = now;
    await user.save();
}

// POST /api/activity - Log a new activity
export async function POST(request: NextRequest) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const body = await request.json();
        const { activityType, metadata = {} } = body as {
            activityType: ActivityType;
            metadata?: IActivityMetadata;
        };

        if (!activityType) {
            return NextResponse.json({ error: 'Activity type is required' }, { status: 400 });
        }

        // Create the activity record
        const activity = await UserActivity.create({
            userId,
            activityType,
            metadata,
        });

        // Update user's streak
        await updateUserStreak(userId);

        return NextResponse.json({
            success: true,
            activity: {
                id: activity._id,
                activityType: activity.activityType,
                createdAt: activity.createdAt,
            }
        }, { status: 201 });
    } catch (error) {
        console.error('Error logging activity:', error);
        return NextResponse.json({ error: 'Failed to log activity' }, { status: 500 });
    }
}

// GET /api/activity - Get user's activities
export async function GET(request: NextRequest) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');
        const page = parseInt(searchParams.get('page') || '1');
        const skip = (page - 1) * limit;

        const activities = await UserActivity.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await UserActivity.countDocuments({ userId });

        return NextResponse.json({
            activities,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        });
    } catch (error) {
        console.error('Error fetching activities:', error);
        return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
    }
}
