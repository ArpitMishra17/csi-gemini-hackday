import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Career from '@/models/Career';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const interests = searchParams.get('interests')?.split(',').filter(Boolean) || [];
    const grade = searchParams.get('grade') || '';

    // Determine suitable level based on grade
    let suitableFor: string[] = ['both'];
    if (grade) {
      const gradeNum = parseInt(grade);
      if (gradeNum >= 9 && gradeNum <= 12) {
        suitableFor = ['high_school', 'both'];
      } else if (gradeNum > 12 || grade.toLowerCase().includes('college')) {
        suitableFor = ['college', 'both'];
      }
    }

    // Build query
    const query: Record<string, unknown> = {
      suitableFor: { $in: suitableFor },
    };

    const careers = await Career.find(query).sort({ name: 1 });

    // If interests provided, score careers by matching skills/name
    if (interests.length > 0) {
      const interestsLower = interests.map((i) => i.toLowerCase());

      const scoredCareers = careers.map((career) => {
        const careerObj = career.toObject();
        let score = 0;

        // Check name match
        if (interestsLower.some((interest) =>
          career.name.toLowerCase().includes(interest) ||
          interest.includes(career.name.toLowerCase())
        )) {
          score += 10;
        }

        // Check skills match
        career.skills.forEach((skill) => {
          if (interestsLower.some((interest) =>
            skill.toLowerCase().includes(interest) ||
            interest.includes(skill.toLowerCase())
          )) {
            score += 2;
          }
        });

        // Check description match
        interestsLower.forEach((interest) => {
          if (career.description.toLowerCase().includes(interest)) {
            score += 1;
          }
        });

        return { ...careerObj, relevanceScore: score };
      }).sort((a, b) => b.relevanceScore - a.relevanceScore);

      return NextResponse.json({
        careers: scoredCareers,
        matchedInterests: interests,
      });
    }

    return NextResponse.json({
      careers: careers.map((c) => c.toObject()),
      matchedInterests: interests,
    });
  } catch (error) {
    console.error('Error fetching recommended careers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommended careers' },
      { status: 500 }
    );
  }
}
