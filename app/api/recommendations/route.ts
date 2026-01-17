import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import UserActivity from '@/models/UserActivity';
import { getGeminiModel } from '@/lib/gemini';

interface JWTPayload {
    userId: string;
    email: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserDoc = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActivityDoc = any;

// GET /api/recommendations - Get AI-powered career recommendations
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

        // Fetch user's career exploration activities
        const careerActivities: ActivityDoc[] = await UserActivity.find({
            userId,
            activityType: { $in: ['career_explore', 'scenario_start', 'scenario_complete'] }
        })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();

        // Build context for AI
        const onboarding = user.onboardingData || {};
        const exploredCareers = careerActivities
            .map((a: ActivityDoc) => a.metadata?.careerName)
            .filter(Boolean);

        const prompt = `You are a career guidance AI for students in high school and college. Based on the student's profile and activity, provide 3-5 personalized career recommendations.

Student Profile:
- Age/Grade: ${onboarding.age || 'Not specified'} / ${onboarding.grade || 'Not specified'}
- Interests: ${onboarding.interests || 'Not specified'}
- Skills: ${onboarding.skills || 'Not specified'}
- Career Aims: ${onboarding.aims || 'Not specified'}
- Learning Preference: ${onboarding.situationPreference || 'Not specified'}
- Exploration Style: ${(onboarding.explorationPreference || []).join(', ') || 'Not specified'}

Careers they've explored: ${exploredCareers.length > 0 ? [...new Set(exploredCareers)].join(', ') : 'None yet'}

Provide recommendations in this exact JSON format:
{
  "recommendations": [
    {
      "career": "Career Name",
      "matchScore": 85,
      "reason": "One sentence explaining why this is a good fit",
      "nextSteps": ["Step 1", "Step 2"]
    }
  ],
  "insight": "One sentence personalized insight about their career exploration journey"
}

Respond ONLY with valid JSON, no markdown or explanation.`;

        const model = getGeminiModel();
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        try {
            // Parse the AI response
            const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
            const parsed = JSON.parse(cleaned);

            return NextResponse.json({
                recommendations: parsed.recommendations || [],
                insight: parsed.insight || 'Keep exploring different careers to discover what excites you!',
                generatedAt: new Date().toISOString(),
            });
        } catch {
            // Fallback recommendations if parsing fails
            return NextResponse.json({
                recommendations: [
                    {
                        career: 'Software Engineer',
                        matchScore: 75,
                        reason: 'Great for problem solvers who enjoy technology and logic.',
                        nextSteps: ['Learn programming basics', 'Try building a simple app'],
                    },
                    {
                        career: 'Doctor',
                        matchScore: 70,
                        reason: 'Ideal for those passionate about helping others and science.',
                        nextSteps: ['Focus on biology and chemistry', 'Volunteer at healthcare facilities'],
                    },
                ],
                insight: 'Complete your profile for more personalized recommendations!',
                generatedAt: new Date().toISOString(),
            });
        }
    } catch (error) {
        console.error('Error generating recommendations:', error);
        return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
    }
}
