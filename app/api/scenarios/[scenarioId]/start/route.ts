import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';
import UserScenarioProgress from '@/models/UserScenarioProgress';
import Career from '@/models/Career';
import { generateScenarioNarration } from '@/lib/gemini';
import { CAREER_SYSTEM_PROMPTS } from '@/lib/prompts';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ scenarioId: string }> }
) {
  try {
    await dbConnect();

    const { scenarioId } = await params;
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const scenario = await Scenario.findById(scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      );
    }

    const career = await Career.findById(scenario.careerId);
    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    // Get first stage
    const firstStage = scenario.stages[0];
    if (!firstStage) {
      return NextResponse.json(
        { error: 'Scenario has no stages' },
        { status: 400 }
      );
    }

    // Check if user has existing progress
    let progress = await UserScenarioProgress.findOne({
      odUserId: userId,
      scenarioId: scenario._id,
    });

    if (progress) {
      // Reset progress if restarting
      progress.currentStageId = firstStage.stageId;
      progress.choices = [];
      progress.completed = false;
      progress.evaluation = null;
      await progress.save();
    } else {
      // Create new progress
      progress = await UserScenarioProgress.create({
        odUserId: userId,
        scenarioId: scenario._id,
        careerId: scenario.careerId,
        currentStageId: firstStage.stageId,
        choices: [],
        completed: false,
        evaluation: null,
      });
    }

    // Generate AI narration for the first stage
    let narration: string;
    try {
      const systemPrompt = CAREER_SYSTEM_PROMPTS[career.slug] || '';
      narration = await generateScenarioNarration(
        scenario.context + '\n\n' + systemPrompt,
        firstStage.prompt,
        []
      );
    } catch (error) {
      console.error('Error generating narration:', error);
      // Fallback to basic context if AI fails
      narration = `${scenario.context}\n\n${firstStage.prompt}`;
    }

    return NextResponse.json({
      progressId: progress._id,
      scenario: {
        _id: scenario._id,
        title: scenario.title,
        description: scenario.description,
      },
      career: {
        name: career.name,
        icon: career.icon,
      },
      currentStage: {
        stageId: firstStage.stageId,
        narration,
        options: firstStage.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
        })),
      },
      stageNumber: 1,
      totalStages: scenario.stages.length,
    });
  } catch (error) {
    console.error('Error starting scenario:', error);
    return NextResponse.json(
      { error: 'Failed to start scenario' },
      { status: 500 }
    );
  }
}
