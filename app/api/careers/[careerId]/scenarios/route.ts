import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';
import Career from '@/models/Career';
import UserScenarioProgress from '@/models/UserScenarioProgress';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ careerId: string }> }
) {
  try {
    await dbConnect();

    const { careerId } = await params;

    // Get user ID from query params (for progress tracking)
    const { searchParams } = new URL(request.url);
    const odUserId = searchParams.get('odUserId');

    // Verify career exists
    const career = await Career.findById(careerId);
    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    const scenarios = await Scenario.find({ careerId })
      .select('_id title description difficulty')
      .sort({ difficulty: 1 });

    // Fetch completion status if user ID is provided
    let completionMap: Record<string, boolean> = {};
    if (odUserId) {
      const progressRecords = await UserScenarioProgress.find({
        odUserId,
        careerId,
        completed: true,
      }).select('scenarioId');

      progressRecords.forEach((record) => {
        completionMap[record.scenarioId.toString()] = true;
      });
    }

    // Add completion status to scenarios
    const scenariosWithProgress = scenarios.map((scenario) => ({
      _id: scenario._id,
      title: scenario.title,
      description: scenario.description,
      difficulty: scenario.difficulty,
      completed: completionMap[scenario._id.toString()] || false,
    }));

    return NextResponse.json({
      career: {
        _id: career._id,
        name: career.name,
        description: career.description,
        icon: career.icon,
      },
      scenarios: scenariosWithProgress,
    });
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scenarios' },
      { status: 500 }
    );
  }
}
